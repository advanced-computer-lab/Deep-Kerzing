import "./Seats.css";
import UserContext from "../../Components/UserContext/UserContext";
import { useContext, useState, useEffect } from "react";
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
    selectedReservation,
    setdepartureChosenSeats,
    chosenDepartureFlight,
    chosenReturnFlight,
    setReturnChosenSeats,
    setDepartureSeats,
    setReturnSeats,
    departureCabin,
    returnCabin,
  } = useContext(UserContext);

  useEffect(() => {
    try {
      if (props.departure) {
        if (
          selectedReservation.departureFlight_id._id ===
            chosenDepartureFlight._id &&
          selectedReservation.departureCabin.toLowerCase() ===
            departureCabin.toLowerCase()
        ) {
          var temp = [];
          selectedReservation.departureSeats.map((element) =>
            temp.push(element)
          );
          setdepartureChosenSeats(temp);
        } else {
          setdepartureChosenSeats([]);
        }
      }
      if (!props.departure) {
        if (
          selectedReservation.returnFlight_id._id === chosenReturnFlight._id &&
          selectedReservation.returnCabin.toLowerCase() ===
            returnCabin.toLowerCase()
        ) {
          var temp = [];
          selectedReservation.returnSeats.map((element) => temp.push(element));
          setReturnChosenSeats(temp);
        } else {
          setReturnChosenSeats([]);
        }
      }
    } catch (err) {}
  }, [departureSeats, returnSeats]);

  const [numberChosen, setnumberChosen] = useState(0);
  const [numberChosenReturn, setnumberChosenReturn] = useState(0);
  const count = props.count;
  var seats = props.booked;
  var number = 1;
  var rows = [];
  console.log("Entered ", departureChosenSeats);
  if (selectedReservation !== undefined) {
    if (props.departure) {
      console.log(seats, " before", selectedReservation.departureSeats);
      selectedReservation.departureSeats.map((element) => {
        seats = seats.filter((element2) => element2 !== element);
      });
      console.log(seats, " after");
    } else {
      console.log(seats, " before", selectedReservation.departureSeats);
      selectedReservation.returnSeats.map((element) => {
        seats = seats.filter((element2) => element2 !== element);
      });
      console.log(seats, " after");
    }
  }
  console.log("Valid or not ", departureChosenSeats, departureSeats);
  if (departureChosenSeats.length + "" === departureSeats + "") {
    setDepSeatsValid(true);
  }
  if (returnChosenSeats.length + "" === returnSeats + "") {
    setRetSeatsValid(true);
  }
  const seatChoice = (event) => {
    setDepSeatsValid(false);
    setRetSeatsValid(false);
    if (props.departure) {
      console.log(event);
      console.log(departureChosenSeats);
      if (departureChosenSeats.includes(event)) {
        var index = departureChosenSeats.indexOf(event);
        departureChosenSeats.splice(index, 1);
        setnumberChosen(numberChosen - 1);
      } else {
        departureChosenSeats.push(event);
        setnumberChosen(numberChosen + 1);
      }
      console.log(departureChosenSeats);
    } else if (!props.departure) {
      if (returnChosenSeats.includes(event)) {
        var index1 = returnChosenSeats.indexOf(event);
        returnChosenSeats.splice(index1, 1);
        setnumberChosenReturn(numberChosenReturn - 1);
      } else {
        returnChosenSeats.push(event);
        setnumberChosenReturn(numberChosenReturn + 1);
      }
    }
    console.log("Valid or not ", departureChosenSeats, departureSeats);
    if (departureChosenSeats.length + "" === departureSeats + "") {
      setDepSeatsValid(true);
    }
    if (returnChosenSeats.length + "" === returnSeats + "") {
      setRetSeatsValid(true);
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
                id={"E" + number + "A"}
                checked={
                  (props.departure &&
                    departureChosenSeats.includes("E" + number + "A")) ||
                  (!props.departure &&
                    returnChosenSeats.includes("E" + number + "A"))
                }
                disabled={seats.includes("E" + number + "A")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={"E" + number + "A"}>{"E" + number + "A"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes("E" + number + "B")) ||
                  (!props.departure &&
                    returnChosenSeats.includes("E" + number + "B"))
                }
                id={"E" + number + "B"}
                disabled={seats.includes("E" + number + "B")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={"E" + number + "B"}>{"E" + number + "B"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes("E" + number + "C")) ||
                  (!props.departure &&
                    returnChosenSeats.includes("E" + number + "C"))
                }
                id={"E" + number + "C"}
                disabled={seats.includes("E" + number + "C")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={"E" + number + "C"}>{"E" + number + "C"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes("E" + number + "D")) ||
                  (!props.departure &&
                    returnChosenSeats.includes("E" + number + "D"))
                }
                id={"E" + number + "D"}
                disabled={seats.includes("E" + number + "D")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={"E" + number + "D"}>{"E" + number + "D"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes("E" + number + "E")) ||
                  (!props.departure &&
                    returnChosenSeats.includes("E" + number + "E"))
                }
                id={"E" + number + "E"}
                disabled={seats.includes("E" + number + "E")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={"E" + number + "E"}>{"E" + number + "E"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes("E" + number + "F")) ||
                  (!props.departure &&
                    returnChosenSeats.includes("E" + number + "F"))
                }
                id={"E" + number + "F"}
                disabled={seats.includes("E" + number + "F")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={"E" + number + "F"}>{"E" + number + "F"}</label>
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
                id={"F" + number + "A"}
                checked={
                  (props.departure &&
                    departureChosenSeats.includes("F" + number + "A")) ||
                  (!props.departure &&
                    returnChosenSeats.includes("F" + number + "A"))
                }
                disabled={seats.includes("F" + number + "A")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={"F" + number + "A"}>{"F" + number + "A"}</label>
            </li>
            <li className="seat">
              <input type="checkbox" id={"F" + number + "B"} disabled />
              <label for={"F" + number + "F"}>{"F" + number + "B"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes("F" + number + "C")) ||
                  (!props.departure &&
                    returnChosenSeats.includes("F" + number + "C"))
                }
                id={"F" + number + "C"}
                disabled={seats.includes("F" + number + "C")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={"F" + number + "C"}>{"F" + number + "C"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes("F" + number + "D")) ||
                  (!props.departure &&
                    returnChosenSeats.includes("F" + number + "D"))
                }
                id={"F" + number + "D"}
                disabled={seats.includes("F" + number + "D")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={"F" + number + "D"}>{"F" + number + "D"}</label>
            </li>
            <li className="seat">
              <input type="checkbox" id={"F" + number + "E"} disabled />
              <label for={"F" + number + "E"}>{"F" + number + "E"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes("F" + number + "F")) ||
                  (!props.departure &&
                    returnChosenSeats.includes("F" + number + "F"))
                }
                id={"F" + number + "F"}
                disabled={seats.includes("F" + number + "F")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={"F" + number + "F"}>{"F" + number + "F"}</label>
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
                id={"B" + number + "A"}
                checked={
                  (props.departure &&
                    departureChosenSeats.includes("B" + number + "A")) ||
                  (!props.departure &&
                    returnChosenSeats.includes("B" + number + "A"))
                }
                disabled={seats.includes("B" + number + "A")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={"B" + number + "A"}>{"B" + number + "A"}</label>
            </li>
            <li className="seat">
              <input type="checkbox" id={"B" + number + "B"} disabled />
              <label for={"B" + number + "B"}>{"B" + number + "B"}</label>
            </li>
            <li className="seat">
              <input type="checkbox" id={"B" + number + "C"} disabled />
              <label for={"B" + number + "C"}>{"B" + number + "C"}</label>
            </li>
            <li className="seat">
              <input type="checkbox" id={"B" + number + "D"} disabled />
              <label for={"B" + number + "D"}>{"B" + number + "D"}</label>
            </li>
            <li className="seat">
              <input type="checkbox" id={"B" + number + "E"} disabled />
              <label for={"B" + number + "E"}>{"B" + number + "E"}</label>
            </li>
            <li className="seat">
              <input
                type="checkbox"
                checked={
                  (props.departure &&
                    departureChosenSeats.includes("B" + number + "F")) ||
                  (!props.departure &&
                    returnChosenSeats.includes("B" + number + "F"))
                }
                id={"B" + number + "F"}
                disabled={seats.includes("B" + number + "F")}
                onClick={(event) => seatChoice(event.target.id)}
              />
              <label for={"B" + number + "F"}>{"B" + number + "F"}</label>
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
