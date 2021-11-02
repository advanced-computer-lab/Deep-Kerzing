import axios from 'axios';

const url = 'http://localhost:8000';

export const fetchFlight = () => axios.get(url+"/flights");
export const fetchUsername = () => axios.get(url + "/getUsername");