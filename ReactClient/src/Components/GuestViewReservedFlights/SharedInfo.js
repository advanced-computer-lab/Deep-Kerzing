import "../searchFlight/adminSearchFlight.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import "reactjs-popup/dist/index.css";
import * as React from "react";
import PopUp from "../PopUp/popUp";
import ReservationCard from "./ReservationCard";

const SharedInfo = (props) => {
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClose = () => {
    setOpen2(false);
  };  
  const updateHandler = () =>{
    props.updateHandler();
  }
  const deleteHandler = () => {
    axios
      .delete(
        "http://localhost:8000/api/reservation/cancel/" + props.reservationId
      )
      .then((res) => {
        console.log(res);
        // props.updateState();
        setOpen(true);
      })
      .catch((err) => {
        console.log("Error in delete");
      });
    props.setLoading(false);
  };

  const reservationHandler = () => {
    axios
      .get("http://localhost:8000/api/reservation/send/" + props.reservationId)
      .then((res) => {
        console.log(res);
        setOpen2(true);
      })
      .catch((err) => {
        console.log("Error in delete");
      });
  };

  return (
    <div>
      <div>
        <div>
          <h3>Price:{props.price}</h3>
        </div>
        <div>
          {date < props.depDateDep && (
            <button className="reserveDelete" onClick={deleteHandler}>
              Delete
            </button>
          )}
        </div>
        <div>
          <button className="reserveDelete" onClick={updateHandler}>
            Update
          </button>
        </div>
        <div>
          <button className="reserveDelete" onClick={reservationHandler}>
            Send Reservation
          </button>
        </div>
      </div>

      {open && (
        <PopUp
          message="Reservation Cancelled"
          content="Your reservation has been cancelled."
          path="/ViewReservations"
        ></PopUp>
      )}

      <Dialog
        open={open2}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your reservation details have been sent to your email.."}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default SharedInfo;
