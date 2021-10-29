import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const LoginHandler = (event) => {
    event.preventDefault();
    console.log(username, password);
  };

  const [allFlights, setAllFlights] = useState("");
  var flag = false;
  const onStart = () => {
    console.log(flag)
    flag = true;
    setAllFlights("hello");
  };

  return (
    <div>
      {flag && onStart()}
      <h1>{allFlights}</h1>
      <form className="container" onSubmit={LoginHandler}>
        <div className="mb-3">
          <label for="exampleInputEmail1">Email address</label>
          <input
            onChange={(event) => setUsername(event.target.value)}
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1">Password</label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="form-control"
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" />
          <label className="form-check-label">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Login;
