import axios from "axios";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: "https://api.coindesk.com/v1/bpi",
  headers,
});

export default instance;
