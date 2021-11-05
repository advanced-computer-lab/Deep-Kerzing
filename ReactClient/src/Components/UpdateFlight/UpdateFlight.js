// import { FaUserPlus, FaUser, FaAt, FaLock, FaUnlock } from "react-icons/fa";
import "../searchFlight/adminSearchFlight.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
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
import { axios } from "axios";



const UpdateFlight = () => {
  const [departureAirport, setDepartureAirport] = useState("New York, John F Kennedy Intl (JFK), United States");
  const [arrivalAirport, setArrivalAirport] = useState("Los Angeles, Los Angeles Intl (LAX), United States");
  const [flightNumber, setFlightNumber] = useState("A123");
  const [departureTime, setDepartureTime] = useState("09:00");
  const [arrivalTime, setArrivalTime] = useState("13:15");
  const [economySeats, setEconomySeats] = useState(250);
  const [businessSeats, setBusinessSeats] = useState(250);
  const [departureDate, setDepartureDate] = useState("2021-10-13");
  const [arrivalDate, setArrivalDate] = useState("2021-10-13");
  const [firstClassSeats, setFirstClassSeats] = useState(5);
  const [firstPrice, setFirstClassPrice] = useState(6000);
  const [businessPrice, setBusinessPrice] = useState(6900);
  const [economyPrice, setEconomyPrice] = useState(690);
  const createHandler = (event) => {
    event.preventDefault();
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
      firstClassSeats: firstClassSeats,
      firstPrice: firstPrice,
      businessPrice: businessPrice,
      economyPrice: economyPrice,
    };
  };
  const nbaTeams = [
    { id: 1, name: "Los Angeles, Los Angeles Intl (LAX), United States" },
    { id: 2, name: "New York, John F Kennedy Intl (JFK), United States" },
    { id: 3, name: "London, Heathrow (LHR), United Kingdom" },
    { id: 4, name: "Dubai, Dubai Intl (DXB), United Arab Emirates" },
    { id: 5, name: "Cairo, Cairo Intl Apt (CAI), Egypt" },
    { id: 6, name: "Munich, Franz Josef Strauss (MUC), Germany" },
    { id: 7, name: "Paris, Charles De Gaulle (CDG), France" },
  ];
  
  return (
    <div className="containerCard">
     
        <form>
      <div className="searchFields">
      <div class="input-group input-group-icon">
              <TextField
                //placeholder={flightNumber}
                value={flightNumber}
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
            {/* Departure Airport */}
            <div class="input-group input-group-icon">
              <Autocomplete
                getOptionSelected={(option, value) => option.id === value.id}
                options={nbaTeams}
                fullWidth="true"
                inputValue={departureAirport}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    defaultValue= {nbaTeams.find(o => o.name === departureAirport).name}
                    //placeholder={nbaTeams.find(o => o.name === departureAirport).name}
                    variant="outlined"
                   // placeholder="Departure Airport"
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
               // getOptionSelected={(option, value) => option.id === value.id}
                options={nbaTeams}
                fullWidth="true"
                //placeholder="Arrival Airport"
                value={nbaTeams[0].name}
                renderInput={(params) => (
                  <TextField
          
                    {...params}
                    //defaultValue= {nbaTeams.find(o => o.name === arrivalAirport).name}
                    //placeholder={nbaTeams.find(o => o.name === arrivalAirport).name}
                   
                    variant="outlined"
                   // placeholder="Arrival Airport"
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
                placeholder={departureTime}
               // defaultValue={departureTime}
                fullWidth="true"
                label="Departure Time"
                type="time"
                 value= {departureTime}
                variant="standard"
                onChange={(event) => setDepartureTime(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              /></div>
            
            <div className="textField">
              <TextField
                fullWidth="true"
                label="Arrival Time"
                type="time"
                // defaultValue="00:00"
                value={arrivalTime}
                variant="standard"
                onChange={(event) => setArrivalTime(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              /></div>
           
           <div className="textField">
              <TextField
               value = {departureDate}
                fullWidth="true"
                label="Departure Date"
                type="date"
                variant="standard"
                onChange={(event) => setDepartureDate(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              /></div>

            <div className="textField">
              <TextField
                value={arrivalDate}
                fullWidth="true"
                label="Arrival Date"
                type="date"
                variant="standard"
                onChange={(event) => setArrivalDate(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              /></div>
           
           
            <div>
              
            </div>
          </div>

            <div className="searchFields">
              <div class="input-group input-group-icon">
                <TextField
                value={economySeats}
                fullWidth="true"
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
                        
                        
              <div class="input-group input-group-icon">
                  <TextField
                  value={businessSeats}
                fullWidth="true"
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
                <div class="input-group input-group-icon">
            <TextField
                value={firstClassSeats}
                fullWidth="true"
                label="First Class Seats Number"
                type="number"
                defaultValue="0"
                variant="standard"
                onChange={(event) => setFirstClassSeats(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </div>
              </div>

          <div className="searchFields">
         
                        
                        
              <div class="input-group input-group-icon">
                  <TextField
                  value={economyPrice}
                fullWidth="true"
                label="Economy Class Price"
                type="number"
                defaultValue="0"
                variant="standard"
                onChange={(event) => setEconomyPrice(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                />
                
                </div>
                <div class="input-group input-group-icon">
            <TextField
                value = {businessPrice}
                fullWidth="true"
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
              <div class="input-group input-group-icon">
            <TextField
                value = {firstPrice}
                fullWidth="true"
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
         
        <button className="buttonCancel">Cancel</button>
        <button className="button">Update</button>
      </form>
    </div>
  );
};
export default UpdateFlight;
