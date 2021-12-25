// import { FaUserPlus, FaUser, FaAt, FaLock, FaUnlock } from "react-icons/fa";
import "../searchFlight/adminSearchFlight.css";
import { updateFlight } from "../../Actions/flight";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlaneDeparture, FaPlaneArrival, FaTicketAlt } from "react-icons/fa";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import PopUp from "../PopUp/popUp";
import { useHistory } from "react-router-dom";

const UpdateFlight = ({ currentId, setCurrentId }) => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [economySeats, setEconomySeats] = useState(0);
  const [businessSeats, setBusinessSeats] = useState(0);
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [firstClassSeats, setFirstClassSeats] = useState(0);
  const [firstPrice, setFirstClassPrice] = useState(0);
  const [businessPrice, setBusinessPrice] = useState(0);
  const [economyPrice, setEconomyPrice] = useState(0);

  const [Airport, setAirport] = useState([]);

  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/airport")
      .then((res) => {
        setAirport(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error from Airport Api");
      });
  }, []);

  const [open, setOpen] = useState(false);

  const inputs = {
    from: departureAirport,
    to: arrivalAirport,
    flightNumber: flightNumber,
    departureTime: departureTime,
    arrivalTime: arrivalTime,
    economySeats: economySeats,
    businessSeats: businessSeats,
    departureDate: departureDate,
    arrivalDate: arrivalDate,
    firstClassSeats: firstClassSeats,
    firstClassPrice: firstPrice,
    businessPrice: businessPrice,
    economyPrice: economyPrice,
  };

  const flight = useSelector((state) =>
    currentId ? state.Flight.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (flight) {
      console.log(flight);
      setDepartureAirport(flight.from);
      setArrivalAirport(flight.to);
      setFlightNumber(flight.flightNumber);
      setDepartureTime(flight.departureTime);
      setArrivalTime(flight.arrivalTime);
      setEconomySeats(flight.economySeats);
      setBusinessSeats(flight.businessSeats);
      setDepartureDate(flight.departureDate);
      setArrivalDate(flight.arrivalDate);
      setFirstClassSeats(flight.firstClassSeats);
      setFirstClassPrice(flight.firstClassPrice);
      setBusinessPrice(flight.businessPrice);
      setEconomyPrice(flight.economyPrice);
    }
    console.log(departureAirport);
  }, [flight]);

  const clear = () => {
    setCurrentId(0);
    setDepartureAirport("");
    setArrivalAirport("");
    setFlightNumber("");
    setDepartureTime("");
    setArrivalTime("");
    setEconomySeats(0);
    setBusinessSeats(0);
    setDepartureDate("");
    setArrivalDate("");
    setFirstClassSeats(0);
    setFirstClassPrice(0);
    setBusinessPrice(0);
    setEconomyPrice(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updateFlight(currentId, inputs));
    }
    setOpen(true);
    clear();
  };

  return (
    <div id="createFlightCard" className="containerCard">
      <h1>
        <FaPlaneDeparture></FaPlaneDeparture>
      </h1>
      <h1> Update Flight</h1>
      <form onSubmit={handleSubmit}>
        <div className="searchFields">
          <div className="input-group input-group-icon">
            <TextField
              value={flightNumber}
              required={true}
              variant="outlined"
              fullWidth={true}
              onChange={(event) => setFlightNumber(event.target.value)}
              InputProps={{
                shrink: "true",
                startAdornment: (
                  <InputAdornment position="start">
                    <FaTicketAlt />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="searchFields">
          {/* Departure Airport */}
          <div className="input-group input-group-icon">
            <Autocomplete
              options={Airport}
              getOptionLabel={(option) => option.name || departureAirport}
              getOptionSelected={(option) => option.name === departureAirport}
              value={departureAirport}
              fullWidth={true}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required={true}
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    shrink: "true",
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaPlaneDeparture />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              onChange={(_event, depAirport) => {
                console.log(depAirport);
                setDepartureAirport(depAirport.name);
              }}
            />
          </div>
          {/*Arrival Airport*/}
          <div className="input-group input-group-icon">
            <Autocomplete
              options={Airport}
              getOptionLabel={(option) => option.name || arrivalAirport}
              getOptionSelected={(option) => option.name === arrivalAirport}
              value={arrivalAirport}
              fullWidth={true}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required={true}
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    shrink: "true",
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaPlaneArrival />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              onChange={(_event, arrAirport) => {
                setArrivalAirport(arrAirport.name);
              }}
            />
          </div>
        </div>

        <div className="searchFields">
          <div className="textField">
            <TextField
              placeholder={departureTime}
              fullWidth={true}
              required={true}
              label="Departure Time"
              type="time"
              value={departureTime}
              variant="standard"
              onChange={(event) => setDepartureTime(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="textField">
            <TextField
              fullWidth={true}
              required={true}
              label="Arrival Time"
              type="time"
              value={arrivalTime}
              variant="standard"
              onChange={(event) => setArrivalTime(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="textField">
            <TextField
              value={departureDate}
              fullWidth={true}
              required={true}
              label="Departure Date"
              type="date"
              variant="standard"
              onChange={(event) => setDepartureDate(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="textField">
            <TextField
              value={arrivalDate}
              fullWidth={true}
              required={true}
              label="Arrival Date"
              type="date"
              variant="standard"
              onChange={(event) => setArrivalDate(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div></div>
        </div>

        <div className="searchFields">
          <div className="input-group input-group-icon">
            <TextField
              value={economySeats}
              fullWidth={true}
              required={true}
              label="Economy Seats Number"
              type="number"
              variant="standard"
              onChange={(event) => setEconomySeats(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="input-group input-group-icon">
            <TextField
              value={businessSeats}
              fullWidth={true}
              required={true}
              label="Business Class Number"
              type="number"
              variant="standard"
              onChange={(event) => setBusinessSeats(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="input-group input-group-icon">
            <TextField
              value={firstClassSeats}
              fullWidth={true}
              required={true}
              label="First Class Seats Number"
              type="number"
              variant="standard"
              onChange={(event) => setFirstClassSeats(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>

        <div className="searchFields">
          <div className="input-group input-group-icon">
            <TextField
              value={economyPrice}
              fullWidth={true}
              required={true}
              label="Economy Class Price"
              type="number"
              variant="standard"
              onChange={(event) => setEconomyPrice(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="input-group input-group-icon">
            <TextField
              value={businessPrice}
              fullWidth={true}
              required={true}
              label="Business Class Seats Price"
              type="number"
              variant="standard"
              onChange={(event) => setBusinessPrice(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="input-group input-group-icon">
            <TextField
              value={firstPrice}
              fullWidth={true}
              required={true}
              label="First Class Seats Price"
              type="number"
              variant="standard"
              onChange={(event) => setFirstClassPrice(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>

        <button
          className="buttonCancel"
          onClick={() => {
            history.push("/admin/ViewFlights");
          }}
        >
          Cancel
        </button>
        <button className="button">Update</button>
      </form>
      {open && (
        <PopUp
          message="Flight Updated"
          content="Your Flight details are now updated. Check it from View Flights"
          path="/admin/ViewFlights"
        ></PopUp>
      )}
    </div>
  );
};
export default UpdateFlight;
