// import { FaUserPlus, FaUser, FaAt, FaLock, FaUnlock } from "react-icons/fa";
import "../searchFlight/adminSearchFlight.css";
import { updateFlight } from "../../Actions/flight";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  //IoIosCreate,
  FaSearch,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaClock,
  FaCalendarDay,
  FaCalendarWeek,
  FaChair,
  FaTicketAlt,
} from "react-icons/fa";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";

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

  const inputs = {
    departureAirport: departureAirport,
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

  ///update/:id
  const flight = useSelector((state) =>
    currentId ? state.Flight.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (flight) {
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
      console.log(flight);
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
    clear();
  };

  return (
    <div className="containerCard">
      <form onSubmit={handleSubmit}>
        <div className="searchFields">
          <div className="input-group input-group-icon">
            <TextField
              value={flightNumber}
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
                setDepartureAirport(depAirport);
              }}
            />
          </div>
          {/*Arrival Airport*/}
          <div className="input-group input-group-icon">
            <Autocomplete
              options={Airport}
              getOptionLabel={(option) => option.name || arrivalAirport}
              getOptionSelected={(option) => option.name == arrivalAirport}
              value={arrivalAirport}
              fullWidth={true}
              renderInput={(params) => (
                <TextField
                  {...params}
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
                setArrivalAirport(arrAirport);
              }}
            />
          </div>
        </div>

        <div className="searchFields">
          <div className="textField">
            <TextField
              placeholder={departureTime}
              fullWidth={true}
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

        <button className="buttonCancel">Cancel</button>
        <button className="button">Update</button>
      </form>
    </div>
  );
};
export default UpdateFlight;
