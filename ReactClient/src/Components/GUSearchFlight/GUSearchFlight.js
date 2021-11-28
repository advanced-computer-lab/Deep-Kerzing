import { useState, useEffect } from "react";
import "../searchFlight/adminSearchFlight.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import MenuItem from "@mui/material/MenuItem";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { useHistory } from "react-router-dom";
const GUSearchFlight = () => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [Airport, setAirport] = useState([]);
  const [selected, setSelected] = useState(false);
  const [cabin, setCabin] = useState("Economy");
  const [numberOfseats, setNumberofSeats] = useState(0);
  const cabins = [
    {
      value: "Economy",
      label: "Economy Class",
    },
    {
      value: "Business",
      label: "Business Class",
    },
    {
      value: "First",
      label: "First Class",
    },
  ];
  const submitSearch = (event) => {
    event.preventDefault();
    const inputs = {
      departureAirport: departureAirport.name,
      arrivalAirport: arrivalAirport.name,
      departureDate: departureDate,
      arrivalDate: arrivalDate,
      cabin: cabin,
      numberOfseats: numberOfseats,
    };
    history.push("/GUAllFlights");
    console.log(inputs)
  };
  var history = useHistory();
  const getDates = (event, picker) => {
    setSelected(true);
    setDepartureDate(picker.startDate._d.toLocaleString("fr-CA").substring(0,10));
    setArrivalDate(picker.endDate._d.toLocaleString("fr-CA").substring(0,10));
  };
  const datesHandler = (event) => {
    event.preventDefault();
    setSelected(false);
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/airport")
      .then((res) => {
        setAirport(res.data);
      })
      .catch((err) => {
        console.log("Error from Airport Api");
      });
  }, [departureAirport, arrivalAirport, departureDate, arrivalDate]);

  return (
    <div className="containerCardGuest">
      <div className="SearchHeader">
        <h1>Flight Search</h1>
      </div>
      <form>
        <div className="searchFieldsGU">
          <div className="GU1">
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
          <div className="GU2">
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
                  required={true}
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
          <div className="GU5">
            <DateRangePicker onEvent={getDates}>
              <button className="selectDates" onClick={datesHandler}>
                {!selected
                  ? "Select Dates"
                  : departureDate + " > " + arrivalDate}
              </button>
            </DateRangePicker>
          </div>
          <div className="GU4">
            <TextField
              required={true}
              errorText={""}
              placeholder="Number of Seats"
              type="number"
              variant="outlined"
              fullWidth={true}
              onInput={(event) => {
                setNumberofSeats(event.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="GU3">
            <TextField
              select
              required={true}
              variant="outlined"
              fullWidth={true}
              value={cabin}
              onChange={(event) => {
                setCabin(event.target.value);
              }}
            >
              {cabins.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <br></br>
        <button className="buttonLogin" onClick={submitSearch}>
          Search
        </button>
      </form>
    </div>
  );
};
export default GUSearchFlight;
