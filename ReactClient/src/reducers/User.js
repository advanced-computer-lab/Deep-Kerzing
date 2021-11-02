export default (User = [], action) => {
  switch (action.type) {
    case "Username":
      return action.payload;
    default:
      return User;
  }
};
