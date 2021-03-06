import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../../Store/auth-context";

const ProtectedRoutesUser = (props) => {
  const authCtx = useContext(AuthContext);
  const isAuthenticated = authCtx.isLoggedIn;
  const role = authCtx.role;
  console.log("this", isAuthenticated);
  console.log("this", role);

  if (isAuthenticated && role === "user") {
    return <Route {...props} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: {
            from: props.location,
          },
        }}
      />
    );
  }
};

export default ProtectedRoutesUser;
