import * as api from "../api/index.js";

export const getUsername = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsername();
    console.log("actions");
    console.log(data);
    dispatch({ type: "Username", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
