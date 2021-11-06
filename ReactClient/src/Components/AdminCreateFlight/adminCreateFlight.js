import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "../searchFlight/adminSearchFlight.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import PopUp from "../PopUp/popUp";
// import { createFlight } from "../../actions/flights";
import axios from "axios";
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

import { IoIosAddCircleOutline } from "react-icons/io";

const AdminCreateFlight = () => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [economySeats, setEconomySeats] = useState("");
  const [businessSeats, setBusinessSeats] = useState("");
  const [firstClassSeats, setFirstClassSeats] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [firstPrice, setFirstClassPrice] = useState("");
  const [businessPrice, setBusinessPrice] = useState("");
  const [economyPrice, setEconomyPrice] = useState("");

  const dispatch = useDispatch();
  const [open,setOpen]= useState(false);

  const [Airport, setAirport] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/airport")
      .then((res) => {
        setAirport(res.data);
      })
      .catch((err) => {
        console.log("Error from Airport Api");
      });
  }, []);

  const createFlight = (event) => {
    event.preventDefault();
    const inputs = {
      flightNumber: flightNumber,
      from: departureAirport.name,
      to: arrivalAirport.name,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      departureDate: departureDate,
      arrivalDate: arrivalDate,
      economySeats: economySeats,
      businessSeats: businessSeats,
      firstClassSeats: firstClassSeats,
      economyPrice: economyPrice,
      businessPrice: businessPrice,
      firstClassPrice: firstPrice,
    };

    console.log(inputs);
    axios
      .post("http://localhost:8000/api/flights/create", inputs)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Error from ShowuserList");
      });
      setOpen(true);
  };

  return (
    <div id="createFlightCard" className="containerCard">
      <h1>
        <IoIosAddCircleOutline />
      </h1>
      <h1> Create Flight</h1>
      <form>
        <div className="searchFields">
          <div className="input-group input-group-icon">
            <TextField
             
              placeholder="Flight Number"
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
              getOptionSelected={(option, value) => option.id === value.id}
              options={Airport}
              fullWidth={true}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Departure Airport"
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
              getOptionLabel={(option) => option.name}
              onChange={(_event, depAirport) => {
                setDepartureAirport(depAirport);
              }}
            />
          </div>
          {/*Arrival Airport*/}
          <div className="input-group input-group-icon">
            <Autocomplete
              getOptionSelected={(option, value) => option.id === value.id}
              options={Airport}
              fullWidth={true}
              placeholder="Arrival Airport"
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Arrival Airport"
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
              getOptionLabel={(option) => option.name}
              onChange={(_event, arrAirport) => {
                setArrivalAirport(arrAirport);
              }}
            />
          </div>
        </div>

        <div className="searchFields">
          <div className="textField">
            <TextField
              fullWidth={true}
              label="Departure Time"
              type="time"
              // value="00:00"
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
              // defaultValue="00:00"
              variant="standard"
              onChange={(event) => setArrivalTime(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="textField">
            <TextField
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
              fullWidth={true}
              label="Economy Seats Number"
              type="number"
              defaultValue="0"
              variant="standard"
              onChange={(event) => setEconomySeats(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="input-group input-group-icon">
            <TextField
              fullWidth={true}
              label="Business Class Number"
              type="number"
              defaultValue="0"
              variant="standard"
              onChange={(event) => setBusinessSeats(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="input-group input-group-icon">
            <TextField
              fullWidth={true}
              label="First Class Seats Number"
              type="number"
              defaultValue={"0"}
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
              required ={true}
              fullWidth={true}
              label="Economy Class Price"
              type="number"
              defaultValue= "0"
              variant="standard"
              onChange={(event) => setEconomyPrice(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="input-group input-group-icon">
            <TextField
              fullWidth={true}
              label="Business Class Seats Price"
              type="number"
              defaultValue="0"
              variant="standard"
              onChange={(event) => setBusinessPrice(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="input-group input-group-icon">
            <TextField
              fullWidth={true}
              label="First Class Seats Price"
              type="number"
              defaultValue="0"
              variant="standard"
              onChange={(event) => setFirstClassPrice(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>

        {/* <div className="searchField"> */}
        <button
          id="createFlightButton"
          className="button "
          onClick={createFlight}
        >
          Create
        </button>
        {/* </div> */}
      </form>
      {open && <PopUp message= "Success!!!!!!!!!"  path="/ViewFlights">
         

         </PopUp> }
      
    </div>
  );
};
export default AdminCreateFlight;
