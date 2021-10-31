import axios from 'axios';

const url = 'http://localhost:8000/flights';

export const fetchFlight = () => axios.get(url);