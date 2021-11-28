import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../../Store/auth-context";

const ProtectedRoutesAdmin = (props) => {
  const authCtx = useContext(AuthContext);
  const isAuthenticated = authCtx.isLoggedIn;
  const role = authCtx.role;
  console.log("this", isAuthenticated);
  console.log("this", role);

  if (isAuthenticated && role === "Admin") {
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

export default ProtectedRoutesAdmin;
