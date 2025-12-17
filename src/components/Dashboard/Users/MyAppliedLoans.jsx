import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaEye, FaTrashAlt, FaCreditCard, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../../context/AuthContext";

const MyAppliedLoans = () => {
  const { user, loading } = useContext(AuthContext);
  const [myLoans, setMyLoans] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (user?.email) fetchMyLoans();
    else if (!loading) setLoadingData(false);
  }, [user, loading]);

  const fetchMyLoans = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/loan-applications/user/${user.email}`
      );
      setMyLoans(res.data);
    } catch (err) {
      toast.error("Failed to fetch applications");
    } finally {
      setLoadingData(false);
    }
  };

  const handleView = (loan) => {
    Swal.fire({
      title: `<span class="text-indigo-600 font-bold">Loan Details</span>`,
      html: `
        <div class="text-left mt-4 space-y-2 text-sm border-t pt-4">
          <p><strong>Title:</strong> ${loan.loanTitle}</p>
          <p><strong>Amount:</strong> $${loan.loanAmount?.toLocaleString()}</p>
          <p><strong>Status:</strong> ${loan.status}</p>
          <p><strong>Payment:</strong> ${
            loan.paymentStatus === "paid" ? "✅ Paid" : "❌ Unpaid"
          }</p>
          ${
            loan.transactionId
              ? `<p><strong>TX ID:</strong> <small class="text-gray-500">${loan.transactionId}</small></p>`
              : ""
          }
          <p><strong>Date:</strong> ${new Date(
            loan.application_date
          ).toLocaleDateString()}</p>
        </div>
      `,
      confirmButtonColor: "#4f46e5",
    });
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `${import.meta.env.VITE_API_URL}/loan-applications/${id}`
          );
          if (res.data.message === "Application cancelled") {
            setMyLoans((prev) => prev.filter((loan) => loan._id !== id));
            Swal.fire("Deleted!", "Your application was removed.", "success");
          }
        } catch (err) {
          toast.error("Delete failed");
        }
      }
    });
  };

  if (loading || loadingData)
    return (
      <div className="p-20 text-center">
        <span className="loading loading-spinner text-indigo-600"></span>
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        My Loan Applications
      </h2>
      <div className="overflow-x-auto border rounded-xl">
        <table className="table w-full">
          <thead className="bg-gray-50">
            <tr>
              <th>ID</th>
              <th>Loan Title</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Status</th>
              <th className="text-center">Payment</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myLoans.map((loan) => (
              <tr key={loan._id} className="hover:bg-gray-50">
                <td className="text-xs font-mono">
                  #{loan._id.slice(-6).toUpperCase()}
                </td>
                <td className="font-medium">{loan.loanTitle}</td>
                <td className="text-center font-bold">${loan.loanAmount}</td>
                <td className="text-center">
                  <span
                    className={`badge badge-sm font-bold ${
                      loan.status === "pending"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {loan.status}
                  </span>
                </td>
                <td className="text-center">
                  {loan.paymentStatus === "paid" ? (
                    <span className="text-green-600 flex items-center justify-center gap-1 text-xs">
                      <FaCheckCircle /> Paid
                    </span>
                  ) : (
                    <span className="text-red-500 text-xs font-bold">
                      Unpaid
                    </span>
                  )}
                </td>
                <td className="flex justify-center gap-2">
                  <button
                    onClick={() => handleView(loan)}
                    className="btn btn-ghost btn-xs text-blue-500"
                  >
                    <FaEye size={16} />
                  </button>
                  {loan.paymentStatus !== "paid" && (
                    <Link
                      to={`/dashboard/payment/${loan._id}`}
                      className="btn btn-xs bg-indigo-600 text-white"
                    >
                      <FaCreditCard /> PAY $50
                    </Link>
                  )}
                  {loan.status === "pending" && (
                    <button
                      onClick={() => handleCancel(loan._id)}
                      className="btn btn-ghost btn-xs text-red-500"
                    >
                      <FaTrashAlt />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppliedLoans;
