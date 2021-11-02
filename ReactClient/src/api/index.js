import axios from "axios";

const url = "http://localhost:8000/api/flights";
// const urlCreate = 'http://localhost:8000/api/flights/create';

export const fetchFlight = () => axios.get(url);
// export const createFlight = (newFlight) => axios.post(urlCreate, newFlight);
