// src/components/Dashboard/Admin/UserDataRow.jsx

import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../context/useAxiousSecure";
// Recommend importing your Toast/SweetAlert library here (e.g., import Swal from 'sweetalert2')

const UserDataRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();

  // Helper function for styling the role badge
  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "manager":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "borrower":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    }
  };

  // Define the mutation function for role change
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ email, newRole }) => {
      const response = await axiosSecure.patch(`/users/role/${email}`, {
        role: newRole,
      });
      return response.data;
    },
    onSuccess: (data) => {
      refetch();
      // Swal.fire('Success', data.message, 'success'); // Example Toast
      console.log("Role updated successfully:", data.message);
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to update role.";
      // Swal.fire('Error', message, 'error'); // Example Toast
      console.error(message);
    },
  });

  // Handler for button clicks
  const handleRoleChange = async (newRole) => {
    // Simple confirmation before proceeding (You should use SweetAlert)
    if (
      !confirm(
        `Are you sure you want to change ${user.email}'s role to ${newRole}?`
      )
    ) {
      return;
    }

    try {
      // Prevent changing the role of the 'admin' user for safety
      if (user.role === "admin") {
        console.warn("Cannot change the role of the primary admin.");
        return;
      }
      await mutateAsync({ email: user.email, newRole });
    } catch (error) {
      // Error handled in onError of useMutation
    }
  };

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
      {/* 1. Name / Email Column */}
      <td className="px-5 py-3 text-sm">
        <p className="whitespace-no-wrap text-gray-900 dark:text-white font-medium">
          {user?.displayName || "N/A"}
        </p>
        <p className="whitespace-no-wrap text-gray-500 dark:text-gray-400 text-xs">
          {user?.email}
        </p>
      </td>

      {/* 2. Role Column (Styled Badge) */}
      <td className="px-5 py-3 text-sm">
        <span
          className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${getRoleBadge(
            user?.role
          )}`}
        >
          {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || "N/A"}
        </span>
      </td>

      {/* 3. Actions Column (Role Change Buttons) */}
      <td className="px-5 py-3 text-sm space-x-2">
        {/* Button to promote to Manager */}
        {user.role !== "manager" && user.role !== "admin" && (
          <button
            onClick={() => handleRoleChange("manager")}
            className="text-white px-3 py-1 text-xs font-medium rounded bg-blue-500 hover:bg-blue-600 transition duration-150"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Make Manager"}
          </button>
        )}

        {/* Button to demote to Borrower */}
        {user.role === "manager" && (
          <button
            onClick={() => handleRoleChange("borrower")}
            className="text-white px-3 py-1 text-xs font-medium rounded bg-yellow-500 hover:bg-yellow-600 transition duration-150"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Demote"}
          </button>
        )}

        {/* Suspend Button (Requires separate modal/logic) */}
        {user.role !== "admin" && (
          <button
            // onClick={() => handleSuspend(user.email)} // Placeholder for suspend logic
            className="text-white px-3 py-1 text-xs font-medium rounded bg-red-500 hover:bg-red-600 transition duration-150 ml-2"
            disabled={isPending}
          >
            Suspend
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserDataRow;
