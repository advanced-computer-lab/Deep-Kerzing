import * as api from '../api/index.js';

export const getFlights = () => async (dispatch) => {
  try {
    const { data } = await api.fetchFlight();
    console.log("actions")
    console.log(data);
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};