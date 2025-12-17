import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import useRole from "../../context/useRole";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);

  // ✅ This hook now correctly fetches role based on email
  const [role, isRoleLoading] = useRole();

  const [loan, setLoan] = useState(null);
  const [loanLoading, setLoanLoading] = useState(true);

  // ✅ Role Logic: Disable for Admin and Manager
  const userRole = role?.toLowerCase();
  const canApply =
    user && user.email && userRole !== "admin" && userRole !== "manager";

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/loans`);
        if (!response.ok) throw new Error("Failed to fetch loan data");
        const allLoans = await response.json();
        const selectedLoan = allLoans.find((l) => l._id === id);
        setLoan(selectedLoan);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoanLoading(false);
      }
    };
    fetchLoanDetails();
  }, [id]);

  const handleApplyNow = () => {
    if (!canApply) return;
    navigate(`/loan-application/${id}`);
  };

  // ✅ Show loading until BOTH Auth and Role are finished
  if (loanLoading || authLoading || isRoleLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
        <p className="ml-4 text-xl text-gray-700 font-medium">
          Verifying details...
        </p>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-red-500 font-bold">Loan not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase text-indigo-600 tracking-wider mb-2">
              {loan.category}
            </p>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              {loan.title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {loan.description}
            </p>
          </div>
          <div className="lg:col-span-1 h-64 overflow-hidden rounded-xl shadow-lg border border-gray-100">
            <img
              src={loan.imageUrl || "https://via.placeholder.com/400x300"}
              alt={loan.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-8 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm mb-12">
          <div className="flex gap-12 mb-6 lg:mb-0">
            <div>
              <p className="text-xs uppercase font-bold text-gray-400 tracking-widest">
                Interest Rate
              </p>
              <p className="text-3xl font-black text-indigo-600 mt-1">
                {loan.interest}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-gray-400 tracking-widest">
                Maximum Limit
              </p>
              <p className="text-3xl font-black text-gray-900 mt-1">
                {loan.maxLimit}
              </p>
            </div>
          </div>

          <button
            onClick={handleApplyNow}
            disabled={!canApply}
            className={`py-4 px-10 text-lg font-bold rounded-xl transition-all duration-300 w-full lg:w-auto shadow-lg 
              ${
                canApply
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 shadow-indigo-200"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
          >
            {canApply ? "Apply Now" : "Restricted Access"}
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Available EMI Plans
          </h2>
          <div className="h-1 flex-grow bg-gray-100 rounded-full"></div>
        </div>

        <div className="overflow-hidden border border-gray-200 rounded-2xl shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Annual Rate
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Estimated Monthly
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loan.emiPlans?.map((plan, index) => (
                <tr
                  key={index}
                  className="hover:bg-indigo-50/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 italic">
                    {plan.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {plan.rate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-bold">
                    Calculated at Checkout
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
