import axios from "axios";

const axiosOpen = axios.create({
  baseURL: "https://blaze-edu-server.vercel.app",
});

const useAxiosOpen = () => {
  return axiosOpen;
};

export default useAxiosOpen;
