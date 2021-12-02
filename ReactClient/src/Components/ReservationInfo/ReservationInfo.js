import InfoCard from "../InfoCard/InfoCard";

const ReservationInfo = (props) => {
  const count = props.count;

  var rows = [];
  for (var i = 0; i < count; i++) {
    rows.push(
      <div>
        <h4>Passenger {i + 1}</h4>
        <InfoCard id={i+1} departure={props.departure}></InfoCard>
        <hr></hr>
      </div>
    );
  }
  return <div>{rows}</div>;
};
export default ReservationInfo;
