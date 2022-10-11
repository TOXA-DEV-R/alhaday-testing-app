/** @format */

import axios from "axios";

const https = axios.create({
  baseURL: "https://api.telegram.org",
});

export default https;
