import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useHistory } from "react-router-dom";
import logo2 from "../GuestNavbar/logo2.png";

const PopUp = (props) => {
  const [open, setOpen] = React.useState(true);

  const history = useHistory();
  const handleClose = () => {
    setOpen(false);
    history.push(props.path);
    window.location.reload(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <div>
          <img src={logo2} className="image" alt="Deep Kerzing" />
        </div>
        <div>
          <p> {props.message}</p>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <h5>{props.content}</h5>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};
export default PopUp;
