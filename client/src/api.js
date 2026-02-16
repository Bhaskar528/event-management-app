import axios from "axios";

const API = axios.create({
  baseURL: "https://bellcrop-event-server.onrender.com/",
});

export default API;