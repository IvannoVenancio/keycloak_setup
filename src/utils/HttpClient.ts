import axios from "axios";

const HttpClient = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

export default HttpClient;