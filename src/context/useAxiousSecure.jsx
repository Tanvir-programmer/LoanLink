import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./AuthProvider"; // Assuming you have a useAuth hook
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // ✅ CRUCIAL for JWT Cookies
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const status = error.response?.status;

        // ✅ Automatically log out on 401 (Unauthorized) or 403 (Forbidden)
        if (status === 401 || status === 403) {
          if (signOutUser) {
            await signOutUser();
          }
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup the interceptor when the component unmounts
    return () => {
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
