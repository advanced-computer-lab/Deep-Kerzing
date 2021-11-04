import { useState, useEffect } from "react";
import "./adminSearchFlight.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";

import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaClock,
  FaCalendarDay,
  FaCalendarWeek,
  FaTicketAlt,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";

const AdminSearchFlight = (props) => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [economySeats, setEconomySeats] = useState("");
  const [businessSeats, setBusinessSeats] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [collapsable, setCollapsable] = useState(false);

  const nbaTeams = [
    { id: 1, name: "Los Angeles, Los Angeles Intl (LAX), United States" },
    { id: 2, name: "New York, John F Kennedy Intl (JFK), United States" },
    { id: 3, name: "London, Heathrow (LHR), United Kingdom" },
    { id: 4, name: "Dubai, Dubai Intl (DXB), United Arab Emirates" },
    { id: 5, name: "Cairo, Cairo Intl Apt (CAI), Egypt" },
    { id: 6, name: "Munich, Franz Josef Strauss (MUC), Germany" },
    { id: 7, name: "Paris, Charles De Gaulle (CDG), France" },
  ];
  // const airports =["CA"]
  const collapseHandler = () => {
    setCollapsable(!collapsable);
  };
  useEffect(() => {
    const inputs = {
      departureAirport: departureAirport,
      arrivalAirport: arrivalAirport,
      flightNumber: flightNumber,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      economySeats: economySeats,
      businessSeats: businessSeats,
      departureDate: departureDate,
      arrivalDate: arrivalDate,
    };
    props.onFilter(inputs);
  }, [
    departureAirport,
    arrivalAirport,
    flightNumber,
    departureTime,
    arrivalTime,
    economySeats,
    businessSeats,
    departureDate,
    arrivalDate,
  ]);

  return (
    <div className="containerCard">
      <div className="SearchHeader">
        {" "}
        <h1>Flight Search</h1>
        <div className="buttonHeader">
          {collapsable && (
            <button className="FiltersButton" onClick={collapseHandler}>
              <FaArrowUp />
            </button>
          )}
          {!collapsable && (
            <button className="FiltersButton" onClick={collapseHandler}>
              <FaArrowDown />
            </button>
          )}
        </div>
      </div>

      {collapsable && (
        <form>
          <div className="searchFields">
            {/* Departure Airport */}
            <div class="input-group input-group-icon">
              <Autocomplete
                getOptionSelected={(option, value) => option.id === value.id}
                options={nbaTeams}
                fullWidth="true"
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
            <div class="input-group input-group-icon">
              <Autocomplete
                getOptionSelected={(option, value) => option.id === value.id}
                options={nbaTeams}
                fullWidth="true"
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
            <div class="input-group input-group-icon">
              <TextField
                placeholder="Flight Number"
                variant="outlined"
                fullWidth="true"
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
            <div class="input-group input-group-icon">
              <TextField
                fullWidth="true"
                label="Departure Time"
                type="time"
                defaultValue="00:00"
                variant="standard"
                onChange={(event) => setDepartureTime(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div class="input-group input-group-icon">
              <TextField
                fullWidth="true"
                label="Arrival Time"
                type="time"
                defaultValue="00:00"
                variant="standard"
                onChange={(event) => setArrivalTime(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div class="input-group input-group-icon">
              <TextField
                fullWidth="true"
                label="Arrival Date"
                type="date"
                variant="standard"
                onChange={(event) => setDepartureDate(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div class="input-group input-group-icon">
              <TextField
                fullWidth="true"
                label="Departure Date"
                type="date"
                variant="standard"
                onChange={(event) => setArrivalDate(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>

          {/* <button className="button">Search</button> */}
        </form>
      )}
    </div>
  );
};
export default AdminSearchFlight;
