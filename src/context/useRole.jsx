import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import useAxiosSecure from "./useAxiousSecure";

const useRole = () => {
  const context = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Handle case where hook is used outside of Provider
  const user = context?.user;
  const loading = context?.loading;

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/user/role/${user?.email}`);
      return result.data?.role || null;
    },
  });

  return [role, isRoleLoading];
};

export default useRole;