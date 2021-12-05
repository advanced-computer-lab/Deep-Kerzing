import "../searchFlight/adminSearchFlight.css";
import * as React from "react";
import "./Checkbox.css";
import UserContext from "../../Components/UserContext/UserContext";
import { useContext, useState, useEffect } from "react";

const InfoCard = (props) => {
  const {
    departurePassengers,
    setDeparturePassengers,
    setReturnPassengers,
    depPassChecker,
    setdepPassChecker,
    setretPassChecker,
    retPassChecker,
    returnPassengers,
  } = useContext(UserContext);
  const [email, setEmail] = useState(
    props.passengers ? props.passengers[0] : ""
  );
  const [name, setName] = useState(props.passengers ? props.passengers[1] : "");
  const [passportNumber, setPassportNumber] = useState(
    props.passengers ? props.passengers[2] : ""
  );
  const [type, setType] = useState(props.passengers ? props.passengers[3] : "");

  useEffect(() => {
    if (props.departure) {
      departurePassengers[props.id] = [email, name, passportNumber, type];
      setDeparturePassengers(departurePassengers);
    } else if (!props.departure) {
      returnPassengers[props.id] = [email, name, passportNumber, type];
      setReturnPassengers(returnPassengers);
    }
    if (props.departure) {
      depPassChecker[props.id] = true;
      setdepPassChecker(depPassChecker);
    } else {
      retPassChecker[props.id] = true;
      setretPassChecker(retPassChecker);
    }
    if (
      email.length <= 1 ||
      name.length <= 1 ||
      passportNumber.length <= 1 ||
      type === ""
    ) {
      if (props.departure) {
        depPassChecker[props.id] = false;
        setdepPassChecker(depPassChecker);
      } else {
        retPassChecker[props.id] = false;
        setretPassChecker(retPassChecker);
      }
    }
    console.log(retPassChecker);

    props.checker();
  }, [email, name, passportNumber, type]);

  return (
    <div>
      <form>
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Email"
          defaultValue={props.passengers ? props.passengers[0] : email}
          required
        />

        <input
          onChange={(event) => setName(event.target.value)}
          type="text"
          placeholder="Full Name"
          required
          defaultValue={props.passengers ? props.passengers[1] : name}
        />

        <input
          onChange={(event) => setPassportNumber(event.target.value)}
          type="text"
          placeholder="Passport Number"
          defaultValue={props.passengers ? props.passengers[2] : passportNumber}
          required
        />
        <div>
          <label className="radio">
            <input
              type="radio"
              value="adult"
              defaultChecked={
                props.passengers && props.passengers[3] === "adult"
                  ? true
                  : false
              }
              name="Age"
              onChange={(event) => setType(event.target.value)}
            />
            <span className="label"></span>Adult
          </label>

          <label className="radio">
            <input
              type="radio"
              value="child"
              name="Age"
              defaultChecked={
                props.passengers && props.passengers[3] === "child"
                  ? true
                  : false
              }
              onChange={(event) => setType(event.target.value)}
            />
            <span className="label"></span>Child
          </label>
        </div>
      </form>
    </div>
  );
};
export default InfoCard;
