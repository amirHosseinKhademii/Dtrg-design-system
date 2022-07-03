import axios from "axios";

export const classNames = (...args: any[]) => args.filter(Boolean).join(" ");

const isProd = process.env.variable === "prod";

let Request: any;

if (axios.defaults) {
  axios.defaults.baseURL = isProd
    ? "https://wa-syd-prod-kl-dtrgcrmbe.azurewebsites.net"
    : "https://wa-syd-dev-kl-dtrgcrmbe.azurewebsites.net";

  Request = axios.create();

  Request.interceptors.request.use(
    async (config: any) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );
} else Request = axios;

export { Request };
