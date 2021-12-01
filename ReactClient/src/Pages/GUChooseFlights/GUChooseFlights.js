import "./GUChooseFlights.css";
import GUAllFlights from "../../Components/GUViewFlights/GUAllFlights";
import UserContext from "../../Components/UserContext/UserContext";
import { useContext, useEffect, useState } from "react";
import Stepper from "./Stepper";
import SeatReservation from "../../Components/SeatReservation/SeatReservation";
import Login from "../Login/Login";
import axios from "axios";
const GUChooseFlights = () => {
  const {
    departureFlights,
    returnFlights,
    setDepartureFlights,
    setReturnFlights,
    departureCabin,
    setDepartureCabin,
    returnCabin,
    setReturnCabin,
    departureSeats,
    setDepartureSeats,
    returnSeats,
    setReturnSeats,
    chosenDepartureFlight,
    setChosenDepartureFlight,
    setChosenReturnFlight,
    chosenReturnFlight,
    setTotalPrice,
    departurePassengers,
    setDeparturePassengers,
    returnPassengers,
    setReturnPassengers,
    totalPrice,
    departureFlight_id,
    setDepartureFlight_id,
    returnFlight_id,
    setReturnFlight_id,
    departureAirport,
    setDepartureAirport,
    arrivalAirport,
    setArrivalAirport,
    departureDate,
    setDepartureDate,
    arrivalDate,
    DepSeatsValid,
    RetSeatsValid,
    DepartureForm,
    setDepartureForm,
    ReturnForm,
    setReturnForm,
    setArrivalDate,
    role,
  } = useContext(UserContext);

  const [BookedDepSeats, setBookedDepSeats] = useState([]);
  const [BookedRetSeats, setBookedRetSeats] = useState([]);
  const [DepSeats, setDepSeats] = useState();
  const [EmptyRetSeats, setEmptyRetSeats] = useState();

  const [step, setStep] = useState(2);
  const [tempPrice, setTempPrice] = useState(totalPrice);
  const [button, setButton] = useState(false);
  const [back, setBack] = useState(false);

  useEffect(() => {
    ButtonChecker();
    checkPrice();
  }, [
    chosenDepartureFlight,
    chosenReturnFlight,
    button,
    step,
    back,
    DepSeatsValid,
  ]);

  const checkPrice = () => {
    // if (chosenDepartureFlight.length === 0 || chosenReturnFlight.length === 0) {
    //   setTempPrice(totalPrice);
    // }
    // if (cabinChosen === "Economy") {
    //   if (chosenDepartureFlight.length !== 0) {
    //     setTempPrice(totalPrice + chosenDepartureFlight.priceEconomy);
    //   }
    //   if (chosenReturnFlight.length !== 0) {
    //     setTempPrice(totalPrice + chosenReturnFlight.priceEconomy);
    //   }
    // } else if (cabinChosen === "First") {
    //   if (chosenDepartureFlight.length !== 0) {
    //     setTempPrice(totalPrice + chosenDepartureFlight.priceFirst);
    //   }
    //   if (chosenReturnFlight.length !== 0) {
    //     setTempPrice(totalPrice + chosenReturnFlight.priceFirst);
    //   }
    // } else if (cabinChosen === "Business") {
    //   if (chosenDepartureFlight.length !== 0) {
    //     setTempPrice(totalPrice + chosenDepartureFlight.priceBusiness);
    //   }
    //   if (chosenReturnFlight.length !== 0) {
    //     setTempPrice(totalPrice + chosenReturnFlight.priceBusiness);
    //   }
    // }
    // console.log(tempPrice, totalPrice);
  };
  const [activeStep, setActiveStep] = useState(0);
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [step5, setStep5] = useState(false);
  const [step6, setStep6] = useState(false);
  const [step7, setStep7] = useState(false);

  const ButtonChecker = () => {
    console.log(DepSeatsValid, "Valid");
    if (step === 2 && chosenDepartureFlight.length !== 0) {
      setButton(true);
    }
    if (step === 3 && DepSeatsValid) {
      setButton(true);
    } else if (step === 3 && !DepSeatsValid) {
      setButton(false);
    }
    if (step === 4 && DepartureForm) {
      setButton(true);
    } else if (step === 4 && !DepartureForm) {
      setButton(false);
    }
    if (step === 5 && chosenReturnFlight.length !== 0) {
      setButton(true);
    }
    if (step === 6 && RetSeatsValid) {
      setButton(true);
    } else if (step === 6 && !RetSeatsValid) {
      setButton(false);
    }
    if (step === 7 && ReturnForm) {
      setButton(true);
    } else if (step === 7 && !ReturnForm) {
      setButton(false);
    }
  };
  const onBack = () => {
    setStep(step - 1);
    setActiveStep(activeStep - 1);
    if (step === 3) {
      setStep2(false);
      setBack(false);
      setStep1(true);
    } else if (step === 4) {
      setStep2(true);
      setStep3(false);
    } else if (step === 5) {
      setStep3(true);
      setStep4(false);
    } else if (step === 6) {
      setStep4(true);
      setStep5(false);
    }
    if (step === 3) {
      setBack(false);
    }
  };
  const onNext = () => {
    setStep(step + 1);
    setActiveStep(activeStep + 1);
    if (step === 2) {
      setStep2(true);
      setBack(true);
      setStep1(false);
      axios
        .get(
          `http://localhost:8000/api/flights?_id=${chosenDepartureFlight._id}`
        )
        .then((res) => {
          setBookedDepSeats(res.data[0].reservedSeats);
          if (departureCabin === "Economy") {
            setDepSeats(res.data[0].economySeats);
          } else if (departureCabin === "Business") {
            setDepSeats(res.data[0].businessSeats);
          } else {
            setDepSeats(res.data[0].firstClassSeats);
          }
        });
    } else if (step === 3) {
      setStep2(false);
      setStep3(true);
    } else if (step === 4) {
      setStep3(false);
      setStep4(true);
    } else if (step === 5) {
      setStep4(false);
      setStep5(true);
      axios
        .get(
          `http://localhost:8000/api/flights?_id=${chosenDepartureFlight._id}`
        )
        .then((res) => {
          setBookedRetSeats(res.data[0].reservedSeats);
          if (returnCabin === "Economy") {
            setReturnSeats(res.data[0].economySeats);
          } else if (departureCabin === "Business") {
            setReturnSeats(res.data[0].businessSeats);
          } else {
            setReturnSeats(res.data[0].firstClassSeats);
          }
        });
    } else if (step === 6) {
      setStep5(false);
      setStep6(true);
    }
    else if (step === 7 ){
      setStep6(false);
      setStep7(true);
    }
  };
  const ContinueReservation = () => {
    if (step === 3) setTotalPrice(tempPrice);
  };

  return (
    <div className="PageGrid">
      <div className="FlightsContainer">
        {step1 && (
          <GUAllFlights
            Flights={departureFlights}
            departure={true}
          ></GUAllFlights>
        )}
        {step2 && (
          <div className="SeatsContainer">
            <SeatReservation
              count={DepSeats}
              booked={BookedDepSeats}
              departure={true}
              cabin={departureCabin}
            ></SeatReservation>
          </div>
        )}
        {step3 && <div>Personal Info</div>}
        {step4 && (
          <GUAllFlights
            Flights={returnFlights}
            departure={false}
          ></GUAllFlights>
        )}
        {step5 && (
          <div className="SeatsContainer">
            <SeatReservation
              count={returnSeats}
              booked={BookedRetSeats}
              departure={false}
              cabin={returnCabin}
            ></SeatReservation>
          </div>
        )}
        {step6 && <div>Personal Info</div>}
        {step7 && !role && (
          <div className="SeatsContainer">
            <Login></Login>
          </div>
        )}
        {step7 && role && (
          <div className="SeatsContainer">
            <h1>Reviewing</h1>
          </div>
        )}
      </div>
      <div className="ChooseHeader">
        <h1>Flight Reservation</h1>
        <Stepper
          steps={[
            { title: "Departure Flight" },
            { title: "Departure Seat" },
            { title: "Passengers Information" },
            { title: "Return Flight" },
            { title: "Return Seat" },
            { title: "Passengers Information" },
            { title: "Confirmation" },
          ]}
          activeStep={activeStep}
        />
      </div>
      <div className="Summary">
        <h1>Summary</h1>
        <h5>From: {}</h5>
        <h5>To: {}</h5>
        <h5>Total Price: {button ? tempPrice : totalPrice}</h5>
      </div>
      <div className="buttonChoose">
        {button && (
          <button className="buttonNext" onClick={onNext}>
            Next
          </button>
        )}
        {!button && (
          <button
            disabled
            className="disabledButton"
            onClick={ContinueReservation}
          >
            Next
          </button>
        )}
        <br></br>
        <br></br>
        {back && (
          <button className="buttonNext" onClick={onBack}>
            {" "}
            Back{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default GUChooseFlights;
