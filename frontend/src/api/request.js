import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

axios.interceptors.request.use(
  function (config) {
    config.withCredentials = true;
    config.headers["authorization"] =
      sessionStorage.getItem("authorization") || "";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    const { data, headers } = response;
    return data;
  },
  (error) => {
    // console.log("error", error);
    return Promise.reject(
      error ? error.response.data : "Internal Server Error"
    );
  }
);

export { axios };
