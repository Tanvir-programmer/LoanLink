import { useQuery } from "@tanstack/react-query";
import useAuth from "./AuthProvider"; // ✅ make sure path is correct
import useAxiosSecure from "./useAxiousSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/user/role/${user?.email}`);
      return result.data?.role;
    },
  });

  return [role, isRoleLoading];
};

export default useRole;
