import "../searchFlight/adminSearchFlight.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import "reactjs-popup/dist/index.css";
import * as React from "react";

const SharedInfo = (props) => {
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = () => {
    axios
      .delete(
        "http://localhost:8000/api/reservation/cancel/" + props.reservationId
      )
      .then((res) => {
        console.log(res);
        props.updateState();
      })
      .catch((err) => {
        console.log("Error in delete");
      });
    setOpen(false);
    props.setLoading(false);
  };

  return (
    <div>
      <div className="sharedInfo">
        <div>
          <h3>Price:{props.price}</h3>
        </div>
        <div>
          {date < props.depDateDep && (
            <button className="reserveDelete" onClick={handleClickOpen}>
              Delete Reservation
            </button>
          )}
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure,You Want To Cancel Your Reservation ?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={deleteHandler}>Yes</Button>
          <Button onClick={handleClose}>NO</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default SharedInfo;
