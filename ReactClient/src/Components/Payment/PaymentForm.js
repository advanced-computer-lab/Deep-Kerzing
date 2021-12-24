import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import AuthContext from "../../Store/auth-context";
import UserContext from "../../Components/UserContext/UserContext";
import React, { useState, useContext } from "react";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#fff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fff" },
      "::placeholder": { color: "#fff" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const authCtx = useContext(AuthContext);
  const [id, setId] = useState("");
  const token = authCtx.token;

  const elements = useElements();
  const {
    departureCabin,
    returnCabin,
    departureSeats,
    returnSeats,
    chosenDepartureFlight,
    chosenReturnFlight,
    departurePassengers,
    returnPassengers,
    departureChosenSeats,
    setTotalPrice,
    DeparturePrice,
    ReturnPrice,
    totalPrice,
    returnChosenSeats,
  } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    var departurePass = [];
    for (const [key, value] of Object.entries(departurePassengers)) {
      departurePass = [...departurePass, ...value];
    }
    console.log(departurePass);
    var returnPass = [];
    for (const [key, value] of Object.entries(returnPassengers)) {
      returnPass = [...returnPass, ...value];
    }
    axios
      .get("http://localhost:8000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resOne) => {
        console.log(resOne);
        console.log(totalPrice, "total Price");
        console.log(DeparturePrice + ReturnPrice, "Total Price 2");
        const inputs = {
          departureFlight_id: chosenDepartureFlight._id,
          returnFlight_id: chosenReturnFlight._id,
          user_id: resOne.data.data._id,
          departureSeatsCount: departureSeats,
          returnSeatsCount: returnSeats,
          departureCabin: departureCabin,
          returnCabin: returnCabin,
          departureSeats: departureChosenSeats,
          returnSeats: returnChosenSeats,
          price: DeparturePrice + ReturnPrice,
          departurePassengers: departurePass,
          returnPassengers: returnPass,
        };
        axios
          .post("http://localhost:8000/api/reservation/reserve", inputs)
          .then((res) => {
            console.log(res.data);
            setId(res.data.data._id);
          })
          .catch((err) => {
            console.log("Error from ShowuserList");
          });
      });

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:8000/api/payment", {
          amount: (DeparturePrice + ReturnPrice) *100 ,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup1">
            <div className="FormRow1">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button className="btn1">Pay</button>
        </form>
      ) : (
        <div>
          <h2>You just paid for your Flight</h2>
        </div>
      )}
    </>
  );
}
