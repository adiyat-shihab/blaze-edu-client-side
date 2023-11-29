import axios from "axios";

const axiosOpen = axios.create({
  baseURL: "https://b8a12-server-side-adiyat-shihab.vercel.app",
});

const useAxiosOpen = () => {
  return axiosOpen;
};

export default useAxiosOpen;
