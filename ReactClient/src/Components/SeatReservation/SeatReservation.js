import "./Seats.css";
const SeatReservation = (props) => {
  const count = props.count;
  var number = 1;
  var rows = [];
  var seats = {};
  const seatChoice = (event) => {
    console.log(event);
    seats[event] = !seats[event];
    console.log(seats)
  };
  for (var i = 0; i < count; i = i + 6) {
    seats[number + "A"] = true;
    seats[number + "B"] = true;
    seats[number + "C"] = true;
    seats[number + "D"] = true;
    seats[number + "E"] = true;
    seats[number + "F"] = true;
    rows.push(
      <li className={"row row--" + number}>
        <ol className="seats" type="A">
          <li className="seat">
            <input
              type="checkbox"
              id={number + "A"}
              disabled={!seats[number + "A"]}
              onClick={(event) => seatChoice(event.target.id)}
            />
            <label for={number + "A"}>{number + "A"}</label>
          </li>
          <li className="seat">
            <input
              type="checkbox"
              id={number + "B"}
              disabled={!seats[number + "B"]}
              onClick={(event) => seatChoice(event.target.id)}
            />
            <label for={number + "B"}>{number + "B"}</label>
          </li>
          <li className="seat">
            <input
              type="checkbox"
              id={number + "C"}
              disabled={!seats[number + "C"]}
              onClick={(event) => seatChoice(event.target.id)}
            />
            <label for={number + "C"}>{number + "C"}</label>
          </li>
          <li className="seat">
            <input
              type="checkbox"
              id={number + "D"}
              disabled={!seats[number + "D"]}
              onClick={(event) => seatChoice(event.target.id)}
            />
            <label for={number + "D"}>{number + "D"}</label>
          </li>
          <li className="seat">
            <input
              type="checkbox"
              id={number + "E"}
              disabled={!seats[number + "E"]}
              onClick={(event) => seatChoice(event.target.id)}
            />
            <label for={number + "E"}>{number + "E"}</label>
          </li>
          <li className="seat">
            <input
              type="checkbox"
              id={number + "F"}
              disabled={!seats[number + "F"]}
              onClick={(event) => seatChoice(event.target.id)}
            />
            <label for={number + "F"}>{number + "F"}</label>
          </li>
        </ol>
      </li>
    );
    number++;
  }
  return (
    <div className="plane">
      <div className="cockpit">
        <h1>Deep Kerzing</h1>
      </div>
      <div className="exit exit--front fuselage"></div>
      <ol className="cabin fuselage">{rows}</ol>
      <div className="exit exit--back fuselage"></div>
    </div>
  );
};
export default SeatReservation;
