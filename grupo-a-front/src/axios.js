import axios from "axios";

let config = {
  baseURL: process.env.VUE_APP_API || ""
};

const _axios = axios.create(config);

export default _axios;
