import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  role:'',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
  
    const remainingDuration = adjExpirationTime - currentTime;
  
    return remainingDuration;
  };
  
const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 3600) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime,
    };
};
  

  export  const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    let initialRole;
    const [role, setRole] = useState(initialRole);

    if (tokenData) {  
        initialToken = JSON.parse(tokenData.token).token;
        axios
        .get("http://localhost:8000/api/user/me", {
          headers: {
            Authorization: `Bearer ${initialToken}`,
          },
        })
        .then((res) => {
          setRole(res.data.data.role);  
          console.log('AAAAA')         
        })
        .catch((err) => {
          console.log("Error Can not Get the profile");
        });
    }
    const [token, setToken] = useState(initialToken); 
    
  
    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        setRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        if (logoutTimer) {
        clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', JSON.stringify(token));      
        localStorage.setItem('expirationTime', expirationTime);
        axios
        .get("http://localhost:8000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
        .then((res) => {
            console.log(res.data.data.role)
          setRole(res.data.data.role);
          console.log('MMMMMMMM')  
        })
        .catch((err) => {
          console.log("Error Can not Get the profile");
        });


        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime);
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
        role:role,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
        {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;