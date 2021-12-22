import "./GUChooseFlights.css";
import GUAllFlights from "../../Components/GUViewFlights/GUAllFlights";
import UserContext from "../../Components/UserContext/UserContext";
import { useContext, useEffect, useState } from "react";
import Stepper from "./Stepper";
import SeatReservation from "../../Components/SeatReservation/SeatReservation";
import axios from "axios";
import ReservationInfo from "../../Components/ReservationInfo/ReservationInfo";
import Review from "./Review";
import LoginChecker from "./LoginChecker";
const GUChooseFlights = () => {
  const {
    departureFlights,
    returnFlights,
    departureCabin,
    returnCabin,
    departureSeats,
    returnSeats,
    chosenDepartureFlight,
    chosenReturnFlight,
    departurePassengers,
    returnPassengers,
    DepSeatsValid,
    RetSeatsValid,
    DeparturePrice,
    ReturnPrice,
    ReturnForm,
    departurePassengersValid,
    returnPassengersValid,
    role,
  } = useContext(UserContext);

  const [BookedDepSeats, setBookedDepSeats] = useState([]);
  const [BookedRetSeats, setBookedRetSeats] = useState([]);
  const [DepSeats, setDepSeats] = useState();
  const [RetSeats, setRetSeats] = useState();
  const [step, setStep] = useState(2);
  const [button, setButton] = useState(false);
  const [back, setBack] = useState(false);
  useEffect(() => {
    ButtonChecker();
  }, [
    chosenDepartureFlight,
    chosenReturnFlight,
    button,
    step,
    back,
    DepSeatsValid,
    RetSeatsValid,
    departurePassengersValid,
    returnPassengersValid,
    departurePassengers,
    returnPassengers,
  ]);

  const [activeStep, setActiveStep] = useState(0);
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [step5, setStep5] = useState(false);
  const [step6, setStep6] = useState(false);
  const [step7, setStep7] = useState(false);

  const ButtonChecker = () => {
    if (step === 2 && chosenDepartureFlight.length !== 0) {
      setButton(true);
    } else if (step === 2 && chosenDepartureFlight.length === 0) {
      setButton(false);
    }
    if (step === 3 && DepSeatsValid) {
      setButton(true);
    } else if (step === 3 && !DepSeatsValid) {
      setButton(false);
    }
    if (step === 4) {
      if (
        Object.keys(departurePassengers).length + "" === departureSeats + "" &&
        departurePassengersValid
      ) {
        setButton(true);
      } else {
        setButton(false);
      }
    }
    if (step === 5 && chosenReturnFlight.length !== 0) {
      setButton(true);
    } else if (step === 5 && chosenReturnFlight.length === 0) {
      setButton(false);
    }
    if (step === 6 && RetSeatsValid) {
      setButton(true);
    } else if (step === 6 && !RetSeatsValid) {
      setButton(false);
    }
    if (step === 7) {
      if (
        Object.keys(returnPassengers).length + "" === returnSeats + "" &&
        returnPassengersValid
      ) {
        setButton(true);
      } else {
        setButton(false);
      }
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
    } else if (step === 7) {
      setStep5(true);
      setStep6(false);
    } else if (step === 8) {
      setStep6(true);
      setStep7(false);
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
          `http://localhost:8000/api/flights?_id=${chosenReturnFlight._id}`
        )
        .then((res) => {
          setBookedRetSeats(res.data[0].reservedSeats);
          if (returnCabin === "Economy") {
            setRetSeats(res.data[0].economySeats);
          } else if (departureCabin === "Business") {
            setRetSeats(res.data[0].businessSeats);
          } else {
            setRetSeats(res.data[0].firstClassSeats);
          }
        });
    } else if (step === 6) {
      setStep5(false);
      setStep6(true);
    } else if (step === 7) {
      setStep6(false);
      setStep7(true);
    }
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
        {step3 && (
          <div className="SeatsContainer">
            <ReservationInfo
              count={departureSeats}
              departure={true}
            ></ReservationInfo>
          </div>
        )}
        {step4 && (
          <GUAllFlights
            Flights={returnFlights}
            departure={false}
          ></GUAllFlights>
        )}
        {step5 && (
          <div className="SeatsContainer">
            <SeatReservation
              count={RetSeats}
              booked={BookedRetSeats}
              departure={false}
              cabin={returnCabin}
            ></SeatReservation>
          </div>
        )}
        {step6 && (
          <div className="SeatsContainer">
            <ReservationInfo
              count={returnSeats}
              departure={false}
            ></ReservationInfo>
          </div>
        )}
        {step7 && role === undefined && (
          <div className="SeatsContainer">
            <LoginChecker checker={true}></LoginChecker>
          </div>
        )}
        {step7 && role === "user" && (
          <div className="SeatsContainer">
            <Review></Review>
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
        <h4>Departure Flight</h4>
        <h6>Price per seat: {DeparturePrice}</h6>
        <h6>
          {departureCabin === "Economy"
            ? "Baggage: 23KG x1"
            : departureCabin === "First"
            ? "Baggage: 27KG x2"
            : "Baggage: 30KG x2"}
        </h6>
        <hr></hr>
        <h4>Return Flight</h4>
        <h6>Price per seat: {ReturnPrice}</h6>
        <h6>
          {returnCabin === "Economy"
            ? "Baggage: 23KG x1"
            : returnCabin === "First"
            ? "Baggage: 27KG x2"
            : "Baggage: 30KG x2"}
        </h6>
        <hr></hr>
        <p>*Children tickets are reduced by 50%.</p>
      </div>
      <div className="buttonChoose">
        {button && !step7 && (
          <button className="buttonNext" onClick={onNext}>
            Next
          </button>
        )}
        {!button && !step7 && (
          <button disabled className="disabledButton">
            Next
          </button>
        )}
        <br></br>
        <br></br>
        {back && (
          <button className="buttonNext" onClick={onBack}>
            Back
          </button>
        )}
      </div>
    </div>
  );
};

export default GUChooseFlights;
