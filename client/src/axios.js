import axios from "axios";

//base url for any request
const instance = axios.create({
  baseURL: "http://localhost:9000",
});

export default instance;
