import "../searchFlight/adminSearchFlight.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import "reactjs-popup/dist/index.css";
import * as React from "react";
import PopUp from "../PopUp/popUp";
import ReservationCard from "./ReservationCard";
import logo2 from "../GuestNavbar/logo2.png";
import * as ReactBootStrap from "react-bootstrap";

import { useContext } from "react";
import AuthContext from "../../Store/auth-context";

const SharedInfo = (props) => {
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const handleClose = () => {
    setOpen2(false);
  };
  const updateHandler = () => {
    props.updateHandler();
  };
  const deleteHandler = () => {
    axios
      .delete(
        "http://localhost:8000/api/reservation/cancel/" + props.reservationId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    setOpen2(true);
    axios
      .get(
        "http://localhost:8000/api/reservation/send/" + props.reservationId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setLoading(true);
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
            Send Details
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
          {loading ? (
            <div>
              {" "}
              <div>
                <img src={logo2} className="image" alt="Deep Kerzing" />
              </div>
              <div>
                <p> {"Reservation Details"}</p>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {loading ? (
              <h5>
                {" "}
                {"Your reservation details have been sent to your email.."}
              </h5>
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
          {loading ? <Button onClick={handleClose}>Close</Button> : <div></div>}
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default SharedInfo;
