import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext/UserContext";
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
import { red } from "@material-ui/core/colors";
const GUSearchFlight = () => {
  const [Airport, setAirport] = useState([]);
  const [selected, setSelected] = useState(false);
  //Errors States
  const [FlightsError, setFlightsError] = useState(false);
  const [FlightsNull, setFlightsNull] = useState(false);
  const [DatesError, setDatesError] = useState(false);

  const history = useHistory();

  const {
    setDepartureFlights,
    setReturnFlights,
    setDepartureSeats,
    setReturnSeats,
    departureSeats,
    returnSeats,
    departureCabin,
    setDepartureCabin,
    returnCabin,
    setReturnCabin,
    departureAirport,
    setDepartureAirport,
    arrivalAirport,
    setArrivalAirport,
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    selectedReservation,
  } = useContext(UserContext);
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
    setFlightsError(false);
    setFlightsNull(false);
    setDatesError(false);
    console.log(departureDate, " Hello");
    console.log(departureAirport, " Hello", arrivalAirport);
    
    if (!departureAirport || !arrivalAirport) {
      setFlightsNull(true);
    } else if (departureAirport === arrivalAirport) {
      setFlightsError(true);
    } else if (!departureDate || !returnDate) {
      setDatesError(true);
    } else {
      const cabinNameDeparture =
        departureCabin.toLowerCase() + "Seats" + "[gte]";
      const cabinNameReturn = returnCabin.toLowerCase() + "Seats" + "[gte]";
      const base = "http://localhost:8000/api/flights/?";
      let urlDeparture =
        base +
        `from=${departureAirport.name}&to=${arrivalAirport.name}&departureDate=${departureDate}&${cabinNameDeparture}=${departureSeats}`;
      let urlArrival =
        base +
        `from=${arrivalAirport.name}&to=${departureAirport.name}&departureDate=${returnDate}&${cabinNameReturn}=${returnSeats}`;
      if (departureAirport.name === undefined) {
        urlDeparture =
          base +
          `from=${departureAirport}&to=${arrivalAirport}&departureDate=${departureDate}&${cabinNameDeparture}=${departureSeats}`;
        urlArrival =
          base +
          `from=${arrivalAirport}&to=${departureAirport}&departureDate=${returnDate}&${cabinNameReturn}=${returnSeats}`;
      }
      axios
        .get(urlDeparture)
        .then((res) => {
          console.log("data", res.data);
          setDepartureFlights(res.data);
        })
        .catch((err) => {
          console.log("Error from Airport Api");
        });
      axios
        .get(urlArrival)
        .then((res) => {
          console.log("Return", res.data);
          setReturnFlights(res.data);
        })
        .catch((err) => {
          console.log("Error from Airport Api");
        });
      history.push("/GUAllFlights");
    }
  };
  const getDates = (event, picker) => {
    setSelected(true);
    setDepartureDate(
      picker.startDate._d.toLocaleString("fr-CA").substring(0, 10)
    );
    setReturnDate(picker.endDate._d.toLocaleString("fr-CA").substring(0, 10));
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
  }, [departureAirport, arrivalAirport, departureDate, returnDate]);

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
              onChange={(_event, arrAirport) => {
                setArrivalAirport(arrAirport);
              }}
            />
          </div>
          <div className="GU3">
            <h6>Departure Flight</h6>
          </div>
          <div className="GU4">
            <TextField
              select
              required={true}
              variant="outlined"
              fullWidth={true}
              value={departureCabin}
              onChange={(event) => {
                setDepartureCabin(event.target.value);
              }}
            >
              {cabins.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="GU5">
            <TextField
              required={true}
              errorText={""}
              defaultValue={1}
              value={departureSeats}
              placeholder="Departure Number of Seats"
              type="number"
              variant="outlined"
              fullWidth={true}
              onChange={(event) => {
                setDepartureSeats(event.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="GU6">
            <h6>Return Flight</h6>
          </div>
          <div className="GU7">
            <TextField
              select
              required={true}
              variant="outlined"
              fullWidth={true}
              value={returnCabin}
              onChange={(event) => {
                setReturnCabin(event.target.value);
              }}
            >
              {cabins.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="GU8">
            <TextField
              required={true}
              errorText={""}
              defaultValue={1}
              value={returnSeats}
              placeholder="Return Number of Seats"
              type="number"
              variant="outlined"
              fullWidth={true}
              onChange={(event) => {
                setReturnSeats(event.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="GU9">
            <DateRangePicker onEvent={getDates}>
              <button className="selectDates" onClick={datesHandler}>
                {departureDate === undefined
                  ? "Select Dates"
                  : departureDate + " > " + returnDate}
              </button>
            </DateRangePicker>
          </div>
        </div>
        <br></br>
        <button className="buttonLogin" onClick={submitSearch}>
          Search
        </button>
      </form>
      <br></br>
      {FlightsError && (
        <h6> Departure and return flights cannot be the same</h6>
      )}
      {FlightsNull && (
        <h6> Departure and return flights cannot be the nulls</h6>
      )}
      {DatesError && <h6> Choose departure and arrival dates of your trip</h6>}
    </div>
  );
};
export default GUSearchFlight;
