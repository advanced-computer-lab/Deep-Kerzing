import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "../../Components/searchFlight/adminSearchFlight.css";

import axios from "axios";
import { FaUser, FaAt, FaLock} from "react-icons/fa";

import { useHistory } from "react-router";


async function loginUser(credentials) {
  return fetch('http://localhost:8000/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const forgetPasswordHandler =()=>{
    history.push("/forgetpassword")
  }

  const LoginHandler = async event => {
    event.preventDefault();
    const token = await loginUser({
      email:username,
      password:password
    });
    setToken(token);
  };

  return (
    <div className="LoginPage">
      <div className="LoginImage"></div>
      <div className="LoginForm">
        <form class="containerCard" onSubmit={LoginHandler}>
          <h1>Login</h1>
          <div class="input-group input-group-icon">
            <input
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              placeholder="Email"
              required
            />
            <div class="input-icon">
              <FaUser></FaUser>
            </div>
          </div>

          <div class="input-group input-group-icon">
            <input
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder=" Password"
              required
            />
            <div class="input-icon">
              <FaLock></FaLock>
            </div>
          </div>
          {/* <div>
          <button className="button" onClick={forgetPasswordHandler}>ForgetPassword!</button>
        </div> */}
          <br />

          <button className="buttonLogin">Login</button>
        </form>
      </div>
    </div>
  );
};
export default Login;
