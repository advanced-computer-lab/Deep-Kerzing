import InfoCard from "../InfoCard/InfoCard";
import { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext/UserContext";
const ReservationInfo = (props) => {
  const {
    departurePassengers,
    returnPassengers,
    departureSeats,
    returnSeats,
    setDeparturePassengers,
    setReturnPassengers,
    setdeparturePassengersValid,
    setreturnPassengersValid,
  } = useContext(UserContext);

  const count = props.count;

  const [depPassChecker, setdepPassChecker] = useState({});
  const [retPassChecker, setretPassChecker] = useState({});
  useEffect(() => {
    console.log(depPassChecker, "Just Checkin");
  }, [depPassChecker, retPassChecker]);
  var rows = [];



  const Checker = () => {
    if (props.departure) {
      setdeparturePassengersValid(true);
      for (var i = 1; i <= departureSeats ; i++) {
        if (depPassChecker[i] === false) {
          setdeparturePassengersValid(false);
          break;
        }
      }
    }
    else {
      setreturnPassengersValid(true);
      for (var i = 1; i <= returnSeats; i++) {
        if (retPassChecker[i] === false) {
          setreturnPassengersValid(false);
          break;
        }
      }
    }
  };



  for (var i = 0; i < count; i++) {
    rows.push(
      <div>
        <UserContext.Provider
          value={{
            depPassChecker,
            setdepPassChecker,
            retPassChecker,
            setretPassChecker,
            departurePassengers,
            setDeparturePassengers,
            setReturnPassengers,
            returnPassengers,
            setdeparturePassengersValid,
            setreturnPassengersValid,
          }}
        >
          <h4>Passenger {i + 1}</h4>
          <InfoCard
            id={i + 1}
            departure={props.departure}
            passengers={
              props.departure
                ? departurePassengers[i + 1 + ""]
                : returnPassengers[i + 1 + ""]
            }
            checker={Checker}
          ></InfoCard>
        </UserContext.Provider>
        <hr></hr>
      </div>
    );
  }
  return <div>{rows}</div>;
};
export default ReservationInfo;
