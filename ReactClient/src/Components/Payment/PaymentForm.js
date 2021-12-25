import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import AuthContext from "../../Store/auth-context";
import UserContext from "../../Components/UserContext/UserContext";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

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

  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    history.push("/");
  };
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
    DeparturePrice,
    ReturnPrice,
    totalPrice,
    returnChosenSeats,
    selectedReservation,
  } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(selectedReservation);
    if (selectedReservation !== undefined) {
      var oldPrice = selectedReservation.price;
      var userId = selectedReservation.user_id;
      // handle payment of update
      console.log(selectedReservation);
      // delete the old reservation
      axios
        .delete(
          "http://localhost:8000/api/reservation/update/" +
            selectedReservation._id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async (res) => {})
        .catch((err) => {
          console.log("Error in delete");
        });
      // add the new one
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
            price: totalPrice,
            departurePassengers: departurePass,
            returnPassengers: returnPass,
          };
          axios
            .post("http://localhost:8000/api/reservation/reserve", inputs, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log(res.data);
              setOpen(true);
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

      var pricePaid = 1;
      if (totalPrice - selectedReservation.price > 0) {
        pricePaid = totalPrice - selectedReservation.price;
      } else {
        console.log(pricePaid);
        axios
          .post(
            "http://localhost:8000/api/reservation/reserve/" + userId,
            {
              refund: (totalPrice - selectedReservation.price) * -1,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {})
          .catch((err) => {
            console.log("Error in delete");
          });
      }

      if (!error) {
        try {
          const { id } = paymentMethod;
          const response = await axios.post(
            "http://localhost:8000/api/payment",
            {
              amount: pricePaid * 100,
              id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

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
    } else {
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
            price: totalPrice,
            departurePassengers: departurePass,
            returnPassengers: returnPass,
          };
          axios
            .post("http://localhost:8000/api/reservation/reserve", inputs, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log(res.data);
              setOpen(true);
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
          const response = await axios.post(
            "http://localhost:8000/api/payment",
            {
              amount: totalPrice * 100,
              id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

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
        <div>{/* <h2>You just paid for your Flight</h2> */}</div>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h3>Your reservation is done successfully</h3>
          <p>Reservation id is : {id}</p>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
