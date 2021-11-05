import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "../searchFlight/adminSearchFlight.css";
import axios from "axios";
import { FaUser } from "react-icons/fa";

const ForgetPassword = () => {
  const [username, setUsername] = useState("");

  const LoginHandler = (event) => {
    event.preventDefault();
    const input = {
      username: username,
    };
    axios("", { input }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  return (
    <div>
      <form className="containerCard" onSubmit={LoginHandler}>
        <div className="input-group input-group-icon">
          <input
            onChange={(event) => setUsername(event.target.value)}
            type="text"
            placeholder="Email"
            required
          />
          <div className="input-icon">
            <FaUser></FaUser>
          </div>
        </div>

        <button className="button">Send!</button>
      </form>
    </div>
  );
};
export default ForgetPassword;
