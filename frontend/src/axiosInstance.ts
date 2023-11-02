import axios from "axios";

const baseURL = "http://localhost:8080";
const Axios = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
});

export default Axios;
