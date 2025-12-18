import axios from "axios";

// Create a simple axios instance
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  // We return the instance directly as we've removed JWT protection
  return axiosSecure;
};

export default useAxiosSecure;
