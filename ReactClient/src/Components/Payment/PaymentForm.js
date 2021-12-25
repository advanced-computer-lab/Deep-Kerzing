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
import logo2 from "../GuestNavbar/logo2.png";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import * as ReactBootStrap from "react-bootstrap";

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
  const [loading, setLoading] = useState(false);

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

    setOpen(true);
    console.log(selectedReservation);
    if (selectedReservation !== undefined) {
      var oldPrice = selectedReservation.price;
      var userId = selectedReservation.user_id;
      // handle payment of update
      console.log(selectedReservation);
      if (totalPrice - oldPrice > 0) {
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
            console.log(inputs);
            axios
              .post("http://localhost:8000/api/reservation/reserve", inputs, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                console.log(res.data);
                setLoading(true);
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

        var pricePaid = totalPrice - selectedReservation.price;

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
            console.log(inputs);
            axios
              .post("http://localhost:8000/api/reservation/reserve", inputs, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                console.log(res.data);
                setLoading(true);
                setId(res.data.data._id);
              })
              .catch((err) => {
                console.log("Error from ShowuserList");
              });
          });
        console.log(pricePaid);
        axios
          .post(
            "http://localhost:8000/api/reservation/refund/" + userId,
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
          console.log(inputs);
          axios
            .post("http://localhost:8000/api/reservation/reserve", inputs, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log(res.data);
              setLoading(true);
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

  var check = false;
  var negative = false;
  var zero = false;

  console.log(selectedReservation, " I am the selected");
  if (selectedReservation !== undefined) {
    check = true;
    if (totalPrice - selectedReservation.price < 0) {
      negative = true;
    } else {
      if (totalPrice - selectedReservation.price === 0) {
        zero = true;
      }
    }
  }

  return (
    <>
      {!success ? (
        check ? (
          negative ? (
            <form onSubmit={handleSubmit}>
              <button className="btn1">Confirm</button>
            </form>
          ) : zero ? (
            <form onSubmit={handleSubmit}>
              <button className="btn1">Confirm</button>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <fieldset className="FormGroup1">
                <div className="FormRow1">
                  <CardElement options={CARD_OPTIONS} />
                </div>
              </fieldset>
              <button className="btn1">Pay</button>
            </form>
          )
        ) : (
          <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup1">
              <div className="FormRow1">
                <CardElement options={CARD_OPTIONS} />
              </div>
            </fieldset>
            <button className="btn1">Pay</button>
          </form>
        )
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
          {loading ? (
            <div>
              <div>
                <img src={logo2} className="image" alt="Deep Kerzing" />
              </div>
              <div>
                <p>Reservation Payment</p>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {loading ? (
              <h5>Your reservation id : {id}</h5>
            ) : (
              <h5
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <ReactBootStrap.Spinner animation="border" />
              </h5>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {loading ? <Button onClick={handleClose}>Done</Button> : <div></div>}
        </DialogActions>
      </Dialog>
    </>
  );
}
