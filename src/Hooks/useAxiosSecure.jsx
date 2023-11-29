import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "./UseAuth.jsx";

const axiosSecure = axios.create({
  baseURL: "https://b8a12-server-side-adiyat-shihab.vercel.app",
});
export const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { SignOut } = UseAuth();
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");

      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;

      if (status === 401 || status === 403) {
        await SignOut();
        navigate("/login");
      }
      return Promise.reject(error);
    },
  );

  return axiosSecure;
};
