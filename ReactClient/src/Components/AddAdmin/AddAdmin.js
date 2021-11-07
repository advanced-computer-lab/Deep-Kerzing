import "../searchFlight/adminSearchFlight.css";
import { useState } from "react";
import { FaUserPlus, FaUser, FaAt } from "react-icons/fa";

const AddAdmin = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");


  const addAdminHandler = (event) => {
    event.preventDefault();
    // const admin = { name: Name, email: Email };
  };

  return (
    <div className="containerCard">
      <form>
        <h1>
          <FaUserPlus />
        </h1>
        <h1>Add Admin</h1>

        <div className="input-group input-group-icon">
          <input
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Full Name"
            required
          />
          <div className="input-icon">
            <FaUser></FaUser>
          </div>
        </div>
        <div className="input-group input-group-icon">
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <div className="input-icon">
            <FaAt></FaAt>
          </div>
        </div>
        <div>
          <button onClick={addAdminHandler} className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddAdmin;
