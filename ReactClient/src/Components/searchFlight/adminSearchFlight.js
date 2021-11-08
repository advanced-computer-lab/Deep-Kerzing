import { useState, useEffect } from "react";
import "./adminSearchFlight.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
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
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [collapsable, setCollapsable] = useState(false);

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
  }, [
    departureAirport,
    flightNumber,
    departureTime,
    arrivalTime,
    arrivalAirport,
    departureDate,
    arrivalDate,
  ]);

  const clearFilters = () => {
    setDepartureAirport("");
    setArrivalAirport("");
    setArrivalDate("");
    setDepartureDate("");
    setFlightNumber("");
    setDepartureTime("");
    setArrivalTime("");
  };
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
    departureDate,
    arrivalDate,
  ]);

  return (
    <div className="containerCard">
      <div className="SearchHeader">
        <h1>Flight Search</h1>

        <div className="buttonHeader">
          {collapsable && (
            <div className="FilterButtons">
              <button className="FiltersButton" onClick={collapseHandler}>
                <FaArrowUp />
              </button>
              &nbsp;
              <button className="FiltersButton" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}
          {!collapsable && (
            <div className="FilterButtons">
              <button className="FiltersButton" onClick={collapseHandler}>
                <FaArrowDown />
              </button>
              &nbsp;
              <button className="FiltersButton" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {collapsable && (
        <form>
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
                getOptionLabel={(option) => option.name || ""}
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
                getOptionSelected={(option) => option.name === arrivalAirport}
                value={arrivalAirport}
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
                getOptionLabel={(option) => option.name || ""}
                onChange={(_event, arrAirport) => {
                  setArrivalAirport(arrAirport);
                }}
              />
            </div>
            <div className="input-group input-group-icon">
              <TextField
                placeholder="Flight Number"
                variant="outlined"
                fullWidth={true}
                value={flightNumber}
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
            <div className="input-group input-group-icon">
              <TextField
                value={departureTime}
                fullWidth={true}
                label="Departure Time"
                type="time"
                variant="standard"
                onChange={(event) => setDepartureTime(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="input-group input-group-icon">
              <TextField
                fullWidth={true}
                label="Arrival Time"
                value={arrivalTime}
                type="time"
                variant="standard"
                onChange={(event) => setArrivalTime(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="input-group input-group-icon">
              <TextField
                fullWidth={true}
                label="Departure Date"
                value={departureDate}
                type="date"
                variant="standard"
                onChange={(event) => setDepartureDate(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="input-group input-group-icon">
              <TextField
                fullWidth={true}
                label="Arrival Date"
                value={arrivalDate}
                type="date"
                variant="standard"
                onChange={(event) => setArrivalDate(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
export default AdminSearchFlight;
