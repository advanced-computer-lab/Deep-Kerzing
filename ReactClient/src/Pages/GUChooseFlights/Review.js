import UserContext from "../../Components/UserContext/UserContext";
import { useContext, useEffect } from "react";
import AuthContext from "../../Store/auth-context";

import axios from "axios";

const Review = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const {
    departureCabin,
    returnCabin,
    departureSeats,
    returnSeats,
    chosenDepartureFlight,
    chosenReturnFlight,
    departurePassengers,
    returnPassengers,
    departureChosenSeats,
    returnChosenSeats,
  } = useContext(UserContext);
  useEffect(() => {
    console.log("Now We Are Testing");
    console.log(
      departureCabin,
      returnCabin,
      departureSeats,
      returnSeats,
      chosenDepartureFlight,
      chosenReturnFlight,
      departurePassengers,
      returnPassengers,
      departureChosenSeats,
      returnChosenSeats
    );
    console.log("Now We Finished Testing");
  }, []);
  const onSubmitHandler = () => {
    var departurePass = [];
    for (const [key, value] of Object.entries(departurePassengers)) {
      departurePass = [...departurePass, ...value];
    }
    console.log(departurePass);
    var returnPass = [];
    for (const [key, value] of Object.entries(returnPassengers)) {
      returnPass = [...returnPass, ...value];
    }
    axios
      .get("http://localhost:8000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resOne) => {
        console.log(resOne);
        const inputs = {
          departureFlight_id: chosenDepartureFlight._id,
          returnFlight_id: chosenReturnFlight._id,
          user_id: resOne.data.data._id,
          departureSeatsCount: departureSeats,
          returnSeatsCount: returnSeats,
          departureCabin: departureCabin,
          returnCabin: returnCabin,
          departureSeats: departureChosenSeats,
          returnSeats: returnChosenSeats,
          price: 0,
          departurePassengers: departurePass,
          returnPassengers: returnPass,
        };
        axios
          .post("http://localhost:8000/api/reservation/reserve", inputs)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log("Error from ShowuserList");
          });
      });
  };
  return (
    <div>
      <h4>Departure Flight Details</h4>
      <p>
        <b>Flight Number:</b> {chosenDepartureFlight.flightNumber}<br></br>
        <b>From:</b> {chosenDepartureFlight.departure}<br></br>
        <b>To:</b> {chosenDepartureFlight.arrival}<br></br>
        <b>Departure Date:</b> {chosenDepartureFlight.depDate}<br></br>
        <b>Departure Time:</b> {chosenDepartureFlight.depTime}<br></br>
        <b>Arrival Time: </b>{chosenDepartureFlight.arrTime}<br></br>
        <b>Chosen Seats:</b> {departureChosenSeats}<br></br>
        <b>Cabin: </b>{departureCabin}
      </p>
      <hr></hr>
      <h4>Return Flight Details</h4>
      <p>
        <b>Flight Number:</b>  {chosenReturnFlight.flightNumber}<br></br>
        <b>From:</b> {chosenReturnFlight.departure}<br></br>
        <b>To:</b> {chosenReturnFlight.arrival}<br></br>
        <b>Departure Date:</b> {chosenReturnFlight.depDate}<br></br>
        <b>Departure Time:</b>  {chosenReturnFlight.arrTime}<br></br>
        <b>Arrival Time: </b> {chosenReturnFlight.depTime}<br></br>
        <b>Chosen Seats:</b> {returnChosenSeats}<br></br>
        <b>Cabin: </b> {returnCabin}
      </p>

      <button onClick={onSubmitHandler}>Confirm</button>
    </div>
  );
};
export default Review;
