import axios from "axios";

const url = "http://localhost:8000/api/flights";
const urlUser = "http://localhost:8000/api/user";
const urlUpdate = "http://localhost:8000/api/flights/update";

export const fetchFlight = () => axios.get(url);
export const updateFlight = (id, updatedFlight) =>
  axios.put(`${urlUpdate}/${id}`, updatedFlight);
