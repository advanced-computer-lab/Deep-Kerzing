import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useContext } from "react";
import "../../Components/searchFlight/adminSearchFlight.css";

import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import useToken from "../../useToken";
import AuthContext from "../../Store/auth-context";

// import { useHistory } from "react-router";

async function loginUser(credentials) {
  return fetch("http://localhost:8000/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const LoginChecker = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const authCtx = useContext(AuthContext);
  // const history = useHistory();
  // const forgetPasswordHandler = () => {
  //   history.push("/forgetpassword");
  // };

  const LoginHandler = async (event) => {
    event.preventDefault();
    try {
      setError(false);
      const token = await loginUser({
        email: username,
        password: password,
      });
      const expirationTime = new Date(new Date().getTime() + +3600 * 10000000);
      authCtx.login(token, expirationTime.toISOString(),props.checker);
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div className="LoginPage">
      <div className="LoginImage"></div>
      <div className="LoginForm">
        <form className="containerCard" onSubmit={LoginHandler}>
          <h1>Login</h1>
          <div className="input-group input-group-icon">
            <input
              onChange={(event) => setUsername(event.target.value.toLowerCase())}
              type="email"
              placeholder="Email"
              required
            />
            <div className="input-icon">
              <FaUser></FaUser>
            </div>
          </div>

          <div className="input-group input-group-icon">
            <input
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder=" Password"
              required
            />
            <div className="input-icon">
              <FaLock></FaLock>
            </div>
          </div>
          {/* <div>
          <button className="button" onClick={forgetPasswordHandler}>ForgetPassword!</button>
        </div> */}
          <br />
          <button className="buttonLogin">Login</button>
          <div className="Incorrect">
            {error && <h6>Incorrect Username/Password</h6>}
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginChecker;
