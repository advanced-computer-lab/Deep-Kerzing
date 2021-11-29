import "./GUChooseFlights.css";
import GUAllFlights from "../../Components/GUViewFlights/GUAllFlights";
import UserContext from "../../Components/UserContext/UserContext";
import { useContext, useEffect, useState } from "react";
import Stepper from "./Stepper";
const GUChooseFlights = () => {
  const {
    departureFlights,
    returnFlights,
    numberofseats,
    cabinChosen,
    chosenDepartureFlight,
    chosenReturnFlight,
    totalPrice,
    setTotalPrice,
  } = useContext(UserContext);
  const [step, setStep] = useState(2);
  const [tempPrice, setTempPrice] = useState(totalPrice);
  const [button, setButton] = useState(false);

  useEffect(() => {
    setButton(false);
    ButtonChecker();
    console.log(ButtonChecker());
    checkPrice();
  }, [chosenDepartureFlight, chosenReturnFlight, button, step]);

  // const [From, setFrom] = useState("");
  // const [to, setTo] = useState("");
  // setFrom(departureFlights[0].from.split(",")[0]);
  // setTo(departureFlights[0].to.split(",")[0]);

  const checkPrice = () => {
    console.log(tempPrice, totalPrice);
    if (chosenDepartureFlight.length === 0 || chosenReturnFlight.length === 0) {
      setTempPrice(totalPrice);
    }
    if (cabinChosen === "Economy") {
      if (chosenDepartureFlight.length !== 0) {
        setTempPrice(totalPrice + chosenDepartureFlight.priceEconomy);
      }
      if (chosenReturnFlight.length !== 0) {
        setTempPrice(totalPrice + chosenReturnFlight.priceEconomy);
      }
    } else if (cabinChosen === "First") {
      if (chosenDepartureFlight.length !== 0) {
        setTempPrice(totalPrice + chosenDepartureFlight.priceFirst);
      }
      if (chosenReturnFlight.length !== 0) {
        setTempPrice(totalPrice + chosenReturnFlight.priceFirst);
      }
    } else if (cabinChosen === "Business") {
      if (chosenDepartureFlight.length !== 0) {
        setTempPrice(totalPrice + chosenDepartureFlight.priceBusiness);
      }
      if (chosenReturnFlight.length !== 0) {
        setTempPrice(totalPrice + chosenReturnFlight.priceBusiness);
      }
    }
    console.log(tempPrice, totalPrice);
  };
  const [activeStep, setActiveStep] = useState(0);
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
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
  const ContinueReservation = () => {
    setStep(step + 1);
    if (step === 2) {
      setStep2(true);
      setStep1(false);
    } else if (step === 3) {
      setStep2(false);
      setStep3(true);
    } else if (step === 4) {
      setStep3(false);
      setStep4(true);
    }
    setActiveStep(activeStep + 1);
    if(step === 3)
      setTotalPrice(tempPrice);
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
        {step2 && <h1>Choose your seat</h1>}
        {step3 && (
          <GUAllFlights
            Flights={returnFlights}
            departure={false}
          ></GUAllFlights>
        )}
        {step4 && <h1>Choose your seat</h1>}
      </div>
      <div className="ChooseHeader">
        <h1>Flight Reservation</h1>
        <Stepper
          steps={[
            { title: "Departure Flight" },
            { title: "Departure Seat" },
            { title: "Return Flight" },
            { title: "Return Seat" },
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
          <button className="buttonNext" onClick={ContinueReservation}>
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
      </div>
    </div>
  );
};

export default GUChooseFlights;
