import "../searchFlight/adminSearchFlight.css";
import * as React from "react";
import "./Checkbox.css";
import UserContext from "../../Components/UserContext/UserContext";
import { useContext, useState } from "react";

const InfoCard = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [type, setType] = useState("");
  const {
    departurePassengers,
    setDeparturePassengers,
    setReturnPassengers,
    returnPassengers,
    setdeparturePassengersValid,
    setreturnPassengersValid,
    departurePassengersValid,
  } = useContext(UserContext);

  const checker = () => {
    setdeparturePassengersValid(true);
    if (email === "" || name === "" || passportNumber === "" || type === "") {
      if (props.departure) {
        setdeparturePassengersValid(false);
      } else {
        setreturnPassengersValid(false);
      }
    } else if (props.departure) {
      setdeparturePassengersValid(true);
      departurePassengers[props.id] = [email, name, passportNumber, type];
      setDeparturePassengers(departurePassengers);
    } else {
      setreturnPassengersValid(true);
      returnPassengers[props.id] = [email, name, passportNumber, type];
      setReturnPassengers(returnPassengers);
    }
  };
  // const onsubmitHandler = () => {
  //   if (props.departure) {
  //     console.log("clicked", departurePassengers);
  //     departurePassengers[props.id] = [email, name, passportNumber, type];
  //     setDeparturePassengers(departurePassengers);
  //   } else {
  //     returnPassengers[props.id] = [email, name, passportNumber, type];
  //     setReturnPassengers(returnPassengers);
  //     // returnPassengers[props.id] = [email, name, passportNumber, type];
  //   }
  //   setdeparturePassengersValid(false);
  //   checker();
  //   console.log("clicked", departurePassengers);
  // };
  return (
    <div>
      <form>
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Email"
          required
        />

        <input
          onChange={(event) => setName(event.target.value)}
          type="text"
          placeholder="Full Name"
          required
        />

        <input
          onInput={(event) => setPassportNumber(event.target.value)}
          type="text"
          placeholder="Passport Number"
          required
        />
        <div>
          <label className="radio">
            <input
              type="radio"
              value="adult"
              onChange={(event) => setType(event.target.value)}
            />
            <span className="label"></span>Adult
          </label>

          <label className="radio">
            <input
              type="radio"
              value="child"
              onChange={(event) => setType(event.target.value)}
            />
            <span className="label"></span>Child
          </label>
        </div>
      </form>
      {checker()}
    </div>
  );
};
export default InfoCard;
