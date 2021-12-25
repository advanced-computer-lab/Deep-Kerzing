import "../searchFlight/adminSearchFlight.css";
import { IoAirplane } from "react-icons/io5";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { AiOutlineInfoCircle } from "react-icons/ai";
import DialogTitle from "@mui/material/DialogTitle";
import "reactjs-popup/dist/index.css";
import * as React from "react";
import SharedInfo from "./SharedInfo";
import { useContext } from "react";
import UserContext from "../UserContext/UserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
const ReservationCard = (props) => {
  const {
    setSelectedReservation,
    setDepartureFlights,
    setReturnFlights,
    setChosenDepartureFlight,
    setChosenReturnFlight,
    setdepartureChosenSeats,
    setReturnChosenSeats,
    setDepartureSeats,
    setReturnSeats,
    setDepartureCabin,
    setReturnCabin,
    setDepartureAirport,
    setArrivalAirport,
    setDepartureDate,
    setReturnDate,
    setDeparturePrice,
    setReturnPrice,
  } = useContext(UserContext);
  const [openDep, setOpenDep] = React.useState(false);
  const [openArr, setOpenArr] = React.useState(false);
  const handleClickOpenDep = () => {
    setOpenDep(true);
  };
  const history = useHistory();
  const onUpdateHandler = () => {
    const cabinNameDeparture =
      props.reservation.departureCabin.toLowerCase() + "Seats" + "[gte]";
    const cabinNameReturn =
      props.reservation.returnCabin.toLowerCase() + "Seats" + "[gte]";
    const base = "http://localhost:8000/api/flights/?";
    const urlDeparture =
      base +
      `from=${props.reservation.departureFlight_id.from}&to=${props.reservation.departureFlight_id.to}&departureDate=${props.reservation.departureFlight_id.departureDate}&${cabinNameDeparture}=${props.reservation.departureSeatsCount}`;
    const urlArrival =
      base +
      `from=${props.reservation.departureFlight_id.to}&to=${props.reservation.departureFlight_id.from}&departureDate=${props.reservation.returnFlight_id.departureDate}&${cabinNameReturn}=${props.reservation.returnSeatsCount}`;
    axios
      .get(urlDeparture)
      .then((res) => {
        console.log(props.reservation.departureFlight_id);
        setSelectedReservation(props.reservation);
        setDepartureFlights(res.data);
        setDepartureAirport(props.reservation.departureFlight_id.from);
        setArrivalAirport(props.reservation.departureFlight_id.to);
        setChosenDepartureFlight(props.reservation.departureFlight_id);
        setDepartureCabin(props.reservation.departureCabin);
        if (props.reservation.departureCabin.toLowerCase() === "economy") {
          setDeparturePrice(props.reservation.departureFlight_id.economyPrice);
        } else if (
          props.reservation.departureCabin.toLowerCase() === "firstclass"
        ) {
          setDeparturePrice(
            props.reservation.departureFlight_id.firstClassPrice
          );
        } else if (
          props.reservation.departureCabin.toLowerCase() === "business"
        ) {
          setDeparturePrice(props.reservation.departureFlight_id.businessPrice);
        }
        setReturnCabin(props.reservation.returnCabin);
        if (props.reservation.returnCabin.toLowerCase() === "economy") {
          setReturnPrice(props.reservation.returnFlight_id.economyPrice);
        } else if (
          props.reservation.returnCabin.toLowerCase() === "firstclass"
        ) {
          setReturnPrice(props.reservation.returnFlight_id.firstClassPrice);
        } else if (props.reservation.returnCabin.toLowerCase() === "business") {
          setReturnPrice(props.reservation.returnFlight_id.businessPrice);
        }

        setDepartureSeats(props.reservation.departureSeatsCount);
        setReturnSeats(props.reservation.returnSeatsCount);
        setDepartureDate(props.reservation.departureFlight_id.departureDate);
        setReturnDate(props.reservation.returnFlight_id.departureDate);
        var temp = [];
        props.reservation.departureSeats.map((element) => temp.push(element));
        setdepartureChosenSeats(temp);
        console.log(props.reservation.departureFlight_id);
        console.log(props.reservation.returnFlight_id);
      })
      .catch((err) => {
        console.log("Error from Airport Api");
      });
    axios
      .get(urlArrival)
      .then((res) => {
        setReturnFlights(res.data);
        setChosenReturnFlight(props.reservation.returnFlight_id);
        var temp = [];
        props.reservation.returnSeats.map((element) => temp.push(element));
        setReturnChosenSeats(temp);
      })
      .catch((err) => {
        console.log("Error from Airport Api");
      });

    history.push("/");
  };
  const handleCloseDep = () => {
    setOpenDep(false);
  };
  const handleClickOpenArr = () => {
    setOpenArr(true);
  };

  const handleCloseArr = () => {
    setOpenArr(false);
  };
  return (
    <div>
      {/* first Flight */}
      <div className="resCard">
        <div className="resCardOne">
          <div className="departureTime">
            <h4>{props.depTimeDep}</h4>
          </div>
          <div className="arrivalTime">
            {/*5,1*/} <h4>{props.arrTimeDep}</h4>
          </div>
          <div className="departure">
            <h3>
              {props.departureAirportDep.substring(
                props.departureAirportDep.indexOf("(") + 1,
                props.departureAirportDep.indexOf("(") + 4
              )}
            </h3>
          </div>
          {/*1,2*/}
          <div className="arrival">
            <h3>
              {props.arrivalAirportDep.substring(
                props.arrivalAirportDep.indexOf("(") + 1,
                props.arrivalAirportDep.indexOf("(") + 4
              )}
            </h3>
          </div>
          {/*5,2*/}
          <div className="flightNum">{props.flightNumberDep}</div> {/*1,1*/}
          <h2 className="Icon">
            <IoAirplane></IoAirplane>
          </h2>
          {/*3,2*/}
          {/*6,1*/}
          <h6 className="depDate">Departing Date: {props.depDateDep}</h6>{" "}
          {/*6,1*/}
          <div className="arrDate">Arriving Date: {props.arrDateDep}</div>{" "}
          <button className="Update" onClick={handleClickOpenDep}>
            Details
          </button>
          {/* <div>
            <button className="Update" onClick={onUpdateHandler}>
              Update
            </button>
          </div> */}
        </div>

        {/* second Flight */}

        <div className="resCardTwo">
          <div className="departureTime">
            {/*1,1*/}
            <h4>{props.depTimeArr}</h4>
          </div>
          <div className="arrivalTime">
            {/*5,1*/} <h4>{props.arrTimeArr}</h4>
          </div>
          <div className="departure">
            <h3>
              {props.departureAirportArr.substring(
                props.departureAirportArr.indexOf("(") + 1,
                props.departureAirportArr.indexOf("(") + 4
              )}
            </h3>
          </div>
          {/*1,2*/}
          <div className="arrival">
            <h3>
              {props.arrivalAirportArr.substring(
                props.arrivalAirportArr.indexOf("(") + 1,
                props.arrivalAirportArr.indexOf("(") + 4
              )}
            </h3>
          </div>
          {/*5,2*/}
          <div className="flightNum">{props.flightNumberArr}</div> {/*1,1*/}
          <h2 className="Icon">
            <IoAirplane></IoAirplane>
          </h2>
          {/*3,2*/}
          {/*6,1*/}
          <h6 className="depDate">Departing Date: {props.depDateArr}</h6>
          {/*6,1*/}
          <div className="arrDate">Arriving Date: {props.arrDateArr}</div>{" "}
          <button className="Update" onClick={handleClickOpenArr}>
            Details
          </button>
          {/*6,2*/}
        </div>
        <div className="sharedInfo">
          <SharedInfo
            price={props.price}
            reservationId={props.reservationId}
            userId={props.userId}
            depDateDep={props.depDateDep}
            updateState={props.updateState}
            setLoading={props.setLoading}
            reservation={props.reservation}
            updateHandler={onUpdateHandler}
          ></SharedInfo>
        </div>
      </div>

      <Dialog
        open={openDep}
        onClose={handleCloseDep}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div>
            <h1>
              <AiOutlineInfoCircle />
            </h1>
            <h1> Details</h1>
          </div>

          <div>
            <h4>Number of Seats</h4>
            <h2>{props.departureSeatsCount}</h2>
            <h4>Seats</h4>
            <h2>
              {props.departureSeats.map((element) => (
                <div key={props._id}>{element}</div>
              ))}
            </h2>
            <h4>Cabin</h4>
            <h2>{props.departureCabin}</h2>
            <h4>Passengers</h4>
            <h2>
              {props.departurePassengers.map((element) => (
                <div>
                  <div>
                    <h2 key={props._id}>{element}</h2>
                  </div>
                </div>
              ))}
            </h2>
          </div>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDep}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openArr}
        onClose={handleCloseArr}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div>
            <h1>
              <AiOutlineInfoCircle />
            </h1>
            <h1> Details</h1>
          </div>
          <div>
            <h4>Number of Seats</h4>
            <h2>{props.returnSeatsCount}</h2>
            <h4>Seats</h4>
            <h2>
              {props.returnSeats.map((element) => (
                <div key={props._id}>{element}</div>
              ))}
            </h2>
            <h4>Cabin</h4>
            <h2>{props.returnCabin}</h2>
            <h4>Passengers</h4>
            <h2>
              {props.returnPassengers.map((element) => (
                <div>
                  <div>
                    <h2 key={props._id}>{element}</h2>
                  </div>
                </div>
              ))}
            </h2>
          </div>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseArr}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ReservationCard;
