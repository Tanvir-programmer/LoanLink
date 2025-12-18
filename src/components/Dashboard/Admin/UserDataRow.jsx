import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../context/useAxiousSecure";
import toast from "react-hot-toast";
import {
  FaUserShield,
  FaUserTie,
  FaUserAlt,
  FaTrashAlt,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import Swal from "sweetalert2";

const UserDataRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();

  // 1. Mutation for Role Change
  const { mutateAsync: updateRole, isPending: isUpdating } = useMutation({
    mutationFn: async ({ email, newRole }) => {
      // ✅ Now sends JWT cookie automatically
      const response = await axiosSecure.patch(`/users/role/${email}`, {
        role: newRole,
      });
      return response.data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Role updated successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Role update failed");
    },
  });

  // 2. Mutation for Delete User
  const { mutateAsync: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: async (email) => {
      // ✅ Now sends JWT cookie automatically
      const response = await axiosSecure.delete(`/users/${email}`);
      return response.data;
    },
    onSuccess: () => {
      refetch();
      toast.success("User removed successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Delete failed");
    },
  });

  // --- Handlers ---
  const handleRoleChange = async (newRole) => {
    if (user.role === "admin") return;
    Swal.fire({
      title: "Change Role?",
      text: `Update ${user?.name || "this user"} to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateRole({ email: user.email, newRole });
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const handleDelete = async () => {
    if (user.role === "admin") {
      return toast.error("Primary Admin cannot be deleted!");
    }
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently removed from the database.",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Yes, Delete User",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(user.email);
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <tr className="border-b border-gray-100 dark:border-slate-800 hover:bg-slate-50 transition-colors">
      {/* Name and Email */}
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800 dark:text-white">
              {user?.name || "N/A"}
            </div>
            <div className="text-xs text-gray-500">{user?.email}</div>
          </div>
        </div>
      </td>

      {/* Role Badge with Icons */}
      <td className="px-6 py-5 whitespace-nowrap">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border 
          ${
            user.role === "admin"
              ? "bg-red-50 text-red-600 border-red-100"
              : user.role === "manager"
              ? "bg-blue-50 text-blue-600 border-blue-100"
              : "bg-emerald-50 text-emerald-600 border-emerald-100"
          }`}
        >
          {user.role === "admin" && <FaUserShield />}
          {user.role === "manager" && <FaUserTie />}
          {(user.role === "borrower" || !user.role) && <FaUserAlt />}
          {user.role || "Borrower"}
        </span>
      </td>

      {/* Action Buttons */}
      <td className="px-6 py-5 whitespace-nowrap text-right space-x-3">
        {/* Role Logic */}
        {(user.role === "borrower" || !user.role) && (
          <button
            onClick={() => handleRoleChange("manager")}
            className="btn btn-ghost btn-xs text-indigo-600 hover:bg-indigo-50 normal-case"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <FaArrowUp />
            )}{" "}
            Make Manager
          </button>
        )}

        {user.role === "manager" && (
          <button
            onClick={() => handleRoleChange("borrower")}
            className="btn btn-ghost btn-xs text-amber-600 hover:bg-amber-50 normal-case"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <FaArrowDown />
            )}{" "}
            Demote
          </button>
        )}

        {/* Delete Action */}
        {user.role !== "admin" && (
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
            disabled={isDeleting}
            title="Delete User"
          >
            {isDeleting ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <FaTrashAlt />
            )}
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserDataRow;
