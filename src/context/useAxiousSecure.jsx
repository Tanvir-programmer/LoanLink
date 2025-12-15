import axios from "axios";
import useAuth from "./AuthProvider"; // adjust path if needed

const useAxiosSecure = () => {
  const { user, getToken } = useAuth(); // assuming getToken returns JWT token

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // your backend URL
  });

  // Request interceptor to add Authorization header
  axiosSecure.interceptors.request.use(
    async (config) => {
      const token = await getToken?.(); // get token from AuthProvider
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
