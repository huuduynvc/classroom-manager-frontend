import axios from "axios";
import { push } from "connected-react-router";
import { saveLogin } from "./../functions/index";

const baseURL:string = process.env.BASE_URL || "https://classroom-manager-backend.herokuapp.com/api"

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  // headers: {
  //   'X-Access-Token': 'accessToken'
  // }
});

export const createAxiosResponseInterceptor = (dispatch?: any) => {
  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    async function (config) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  const interceptor = axiosInstance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      const {
        response: { status },
      } = error;
      if (status !== 401) {
        return Promise.reject(error);
      }
      axios.interceptors.response.eject(interceptor);
      const refreshToken = localStorage.getItem("refreshToken");
      const token = localStorage.getItem("token");

      if (refreshToken && token) {
        return axios
          .post(`${baseURL}/api/auth/refresh`, {
            refreshToken,
            token
          })
          .then((response) => {
            saveLogin({
              token: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            });
            error.response.config.headers["Authorization"] =
              "Bearer " + response.data.accessToken;
            return axios(error.response.config);
          })
          .catch((error) => {
            dispatch(push("/"));
            return Promise.reject(error);
          })
          .finally(createAxiosResponseInterceptor);
      } else {
        return Promise.reject(error);
      }
    }
  );
};

export function parseJwt(token: any) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
