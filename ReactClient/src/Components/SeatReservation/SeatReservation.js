import "./Seats.css";
import UserContext from "../../Components/UserContext/UserContext";
import { useContext, useState } from "react";
const SeatReservation = (props) => {
  const {
    departureSeats,
    departureChosenSeats,
    returnSeats,
    returnChosenSeats,
    DepSeatsValid,
    RetSeatsValid,
    setDepSeatsValid,
    setRetSeatsValid,
  } = useContext(UserContext);
  const [numberChosen, setnumberChosen] = useState(0);
  const [numberChosenReturn, setnumberChosenReturn] = useState(0);

  const count = props.count;
  const seats = props.booked;
  var number = 1;
  var rows = [];

  const seatChoice = (event) => {
    setDepSeatsValid(false);
    setRetSeatsValid(false);

    if (props.departure) {
      if (departureChosenSeats.includes(event)) {
        var index = departureChosenSeats.indexOf(event);
        departureChosenSeats.splice(index, 1);
        setnumberChosen(numberChosen - 1);
        if (numberChosen - 1 + "" === departureSeats + "") {
          setDepSeatsValid(true);
        }
      } else {
        departureChosenSeats.push(event);
        setnumberChosen(numberChosen + 1);
        if (numberChosen + 1 + "" === departureSeats + "") {
          setDepSeatsValid(true);
        }
      }
    } else if(!props.departure) {
      if (returnChosenSeats.includes(event)) {
        var index1 = returnChosenSeats.indexOf(event);
        returnChosenSeats.splice(index1, 1);
        setnumberChosenReturn(numberChosenReturn - 1);
        if ((numberChosenReturn - 1 + "" === returnSeats +"")) {
          setRetSeatsValid(true);
        }
      } else {
        returnChosenSeats.push(event);
        setnumberChosenReturn(numberChosenReturn + 1);
        if ((numberChosenReturn + 1 + "" === returnSeats +"")) {
          setRetSeatsValid(true);
        }
      }

    }
  };

  //Drawing the cabins
  if (props.cabin === "Economy") {
    for (var i = 0; i < count; i = i + 6) {
      rows.push(
        <li className={"row row--" + number}>
          <ol className="seats" type="A">
            <li className="seat">
              <input
                type="checkbox"
                id={number + "A"}
                checked={
                  (props.departure &&
                    departureChosenSeats.includes(number + "A")) ||
                  (!props.departure && returnChosenSeats.includes(number + "A"))
                }
                disabled={seats.includes(number + "A")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={number + "A"}>{number + "A"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes(number + "B")) ||
                  (!props.departure && returnChosenSeats.includes(number + "B"))
                }
                id={number + "B"}
                disabled={seats.includes(number + "B")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={number + "B"}>{number + "B"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes(number + "C")) ||
                  (!props.departure && returnChosenSeats.includes(number + "C"))
                }
                id={number + "C"}
                disabled={seats.includes(number + "C")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={number + "C"}>{number + "C"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes(number + "D")) ||
                  (!props.departure && returnChosenSeats.includes(number + "D"))
                }
                id={number + "D"}
                disabled={seats.includes(number + "D")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={number + "D"}>{number + "D"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes(number + "E")) ||
                  (!props.departure && returnChosenSeats.includes(number + "E"))
                }
                id={number + "E"}
                disabled={seats.includes(number + "E")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={number + "E"}>{number + "E"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes(number + "F")) ||
                  (!props.departure && returnChosenSeats.includes(number + "F"))
                }
                id={number + "F"}
                disabled={seats.includes(number + "F")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={number + "F"}>{number + "F"}</label>
            </li>
          </ol>
        </li>
      );
      number++;
    }
  } else if (props.cabin === "First") {
    for (var i = 0; i < count; i = i + 4) {
      rows.push(
        <li className={"row row--" + number}>
          <ol className="seats" type="A">
            <li className="seat">
              <input
                type="checkbox"
                id={number + "A"}
                checked={
                  (props.departure &&
                    departureChosenSeats.includes(number + "A")) ||
                  (!props.departure && returnChosenSeats.includes(number + "A"))
                }
                disabled={seats.includes(number + "A")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={number + "A"}>{number + "A"}</label>
            </li>
            <li className="seat">
              <input type="checkbox" id={number + "B"} disabled />
              <label for={number + "B"}>{number + "B"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes(number + "C")) ||
                  (!props.departure && returnChosenSeats.includes(number + "C"))
                }
                id={number + "C"}
                disabled={seats.includes(number + "C")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={number + "C"}>{number + "C"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes(number + "D")) ||
                  (!props.departure && returnChosenSeats.includes(number + "D"))
                }
                id={number + "D"}
                disabled={seats.includes(number + "D")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={number + "D"}>{number + "D"}</label>
            </li>
            <li className="seat">
              <input type="checkbox" id={number + "E"} disabled />
              <label for={number + "E"}>{number + "E"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes(number + "F")) ||
                  (!props.departure && returnChosenSeats.includes(number + "F"))
                }
                id={number + "F"}
                disabled={seats.includes(number + "F")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={number + "F"}>{number + "F"}</label>
            </li>
          </ol>
        </li>
      );
      number++;
    }
  } else if (props.cabin === "Business") {
    for (var i = 0; i < count; i = i + 2) {
      rows.push(
        <li className={"row row--" + number}>
          <ol className="seats" type="A">
            <li className="seat">
              <input
                type="checkbox"
                id={number + "A"}
                checked={
                  (props.departure &&
                    departureChosenSeats.includes(number + "A")) ||
                  (!props.departure && returnChosenSeats.includes(number + "A"))
                }
                disabled={seats.includes(number + "A")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={number + "A"}>{number + "A"}</label>
            </li>
            <li className="seat">
              <input type="checkbox" id={number + "B"} disabled />
              <label for={number + "B"}>{number + "B"}</label>
            </li>
            <li className="seat">
              <input type="checkbox" id={number + "C"} disabled />
              <label for={number + "C"}>{number + "C"}</label>
            </li>
            <li className="seat">
              <input type="checkbox" id={number + "D"} disabled />
              <label for={number + "D"}>{number + "D"}</label>
            </li>
            <li className="seat">
              <input type="checkbox" id={number + "E"} disabled />
              <label for={number + "E"}>{number + "E"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes(number + "F")) ||
                  (!props.departure && returnChosenSeats.includes(number + "F"))
                }
                id={number + "F"}
                disabled={seats.includes(number + "F")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={number + "F"}>{number + "F"}</label>
            </li>
          </ol>
        </li>
      );
      number++;
    }
  }

  return (
    <div className="plane">
      <div className="cockpit">
        <h1>Deep Kerzing</h1>
      </div>
      <div className="exit exit--front fuselage"></div>
      <ol className="cabin fuselage">{rows}</ol>
      <div className="exit exit--back fuselage"></div>
      <br></br>
      <div>
        {((!DepSeatsValid && props.departure) ||
          (!props.departure && !RetSeatsValid)) && (
          <h5>
            Number of seats does not match the number you specified earlier
          </h5>
        )}
      </div>
    </div>
  );
};
export default SeatReservation;
