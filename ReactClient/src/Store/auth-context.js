import React, { useState, useEffect, useCallback } from "react";
import jwt from "jsonwebtoken";
let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  role: "",
  isLoggedIn: false,
  login: (token, checker) => {},
  logout: () => {},
});
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  let initialRole;
  if (tokenData) {
    console.log(tokenData);
    initialToken = JSON.parse(tokenData.token).token;
    initialRole = jwt.decode(initialToken).role;
    //initialRole = JSON.parse(tokenData.token).role;
    console.log(initialToken);
    console.log(initialRole);
  }

  const [token, setToken] = useState(initialToken);
  const [role, setRole] = useState(initialRole);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, checker) => {
    setToken(token);
    setRole(token.role);
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
    console.log("I am the checker", checker);
    if (!checker) {
      console.log("I am the checker", checker);
      window.location.pathname = "/";
    }
  };

  const loginHandler2 = (token, expirationTime, checker) => {
    setToken(token.token);
    setRole(token.role);
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
    console.log("I am the checker", checker);
    window.location.pathname = "/";
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    role: role,
    login: loginHandler,
    login2: loginHandler2,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
