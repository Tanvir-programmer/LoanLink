import { useQuery } from "@tanstack/react-query";
import useAuth from "./AuthProvider"; // ✅ Ensure this points to your useAuth hook
import useAxiosSecure from "./useAxiousSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: isRoleLoading } = useQuery({
    // Only run if auth is finished and we have an email
    enabled: !loading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      // ✅ FIX: Added ${user.email} to match your backend route
      const result = await axiosSecure.get(`/user/role/${user?.email}`);
      console.log("Fetched Role:", result.data?.role);
      return result.data?.role;
    },
  });

  return [role, isRoleLoading];
};

export default useRole;
