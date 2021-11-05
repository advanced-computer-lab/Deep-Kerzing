export default (Flight = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "UPDATE":
      return Flight.map((element) =>
        element._id === action.payload._id ? action.payload : element
      );
    default:
      return Flight;
  }
};
