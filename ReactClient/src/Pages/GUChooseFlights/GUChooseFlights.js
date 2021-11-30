import "./GUChooseFlights.css";
import GUAllFlights from "../../Components/GUViewFlights/GUAllFlights";
import UserContext from "../../Components/UserContext/UserContext";
import { useContext, useEffect, useState } from "react";
import Stepper from "./Stepper";
import SeatReservation from "../../Components/SeatReservation/SeatReservation";
import Login from "../Login/Login";
import { FaStepBackward } from "react-icons/fa";
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
    setArrivalDate,
    role,
  } = useContext(UserContext);

  const [step, setStep] = useState(2);
  const [tempPrice, setTempPrice] = useState(totalPrice);
  const [button, setButton] = useState(false);
  const [back, setBack] = useState(false);

  useEffect(() => {
    setButton(false);
    ButtonChecker();
    console.log(ButtonChecker());
    checkPrice();
  }, [chosenDepartureFlight, chosenReturnFlight, button, step, back]);

  const checkPrice = () => {
    console.log(tempPrice, totalPrice);
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

  const ButtonChecker = () => {
    if (step === 2 && chosenDepartureFlight.length !== 0) {
      setButton(true);
      return true;
    }
    if (step === 4 && chosenReturnFlight.length !== 0) {
      setButton(true);
      return true;
    }
    if (step !== 4 && step !== 2) {
      setButton(true);
      return true;
    }
    if (step === 5) {
      setTempPrice(0);
    }
    setButton(false);
    return false;
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
    console.log("Back", step);
  };
  const onNext = () => {
    setStep(step + 1);
    setActiveStep(activeStep + 1);
    if (step === 2) {
      setStep2(true);
      setBack(true);
      setStep1(false);
    } else if (step === 3) {
      setStep2(false);
      setStep3(true);
    } else if (step === 4) {
      setStep3(false);
      setStep4(true);
    } else if (step === 5) {
      setStep4(false);
      setStep5(true);
    }

    console.log("Next", step);
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
            <SeatReservation count={40}></SeatReservation>
          </div>
        )}
        {step3 && (
          <GUAllFlights
            Flights={returnFlights}
            departure={false}
          ></GUAllFlights>
        )}
        {step4 && (
          <div className="SeatsContainer">
            <SeatReservation count={20}></SeatReservation>
          </div>
        )}
        {step5 && !role && (
          <div className="SeatsContainer">
            <Login></Login>
          </div>
        )}
        {step5 && role && (
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
            { title: "Return Flight" },
            { title: "Return Seat" },
            { title: "Review" },
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
