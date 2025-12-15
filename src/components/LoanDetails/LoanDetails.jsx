import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const [loan, setLoan] = useState(null);
  const [loanLoading, setLoanLoading] = useState(true);

  // Determine if user can apply
  const canApply =
    user && user.email && user.role !== "Admin" && user.role !== "Manager"; // Assuming your backend returns user.role

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

  if (loanLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-gray-700">Loading loan details...</p>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-red-500">Loan not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Loan Info */}
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
          <div className="lg:col-span-1 h-64 overflow-hidden rounded-xl shadow-lg">
            <img
              src={loan.imageUrl}
              alt={loan.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        {/* Interest & Max Limit */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-6 bg-indigo-50 border border-indigo-200 rounded-xl shadow-inner mb-10">
          <div className="flex space-x-12 mb-6 lg:mb-0">
            <div>
              <p className="text-sm font-medium text-gray-600">Interest Rate</p>
              <p className="text-3xl font-extrabold text-gray-900 mt-1">
                {loan.interest}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Maximum Limit</p>
              <p className="text-3xl font-extrabold text-gray-900 mt-1">
                {loan.maxLimit}
              </p>
            </div>
          </div>

          <button
            onClick={handleApplyNow}
            disabled={!canApply}
            className={`py-3 px-8 text-lg font-semibold rounded-lg transition duration-200 w-full lg:w-auto ${
              canApply
                ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/50"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            title={
              !user
                ? "Please log in to apply"
                : user.role === "Admin"
                ? "Admins cannot apply"
                : user.role === "Manager"
                ? "Managers cannot apply"
                : "Apply for this loan"
            }
          >
            Apply Now
          </button>
        </div>

        {/* EMI Plans */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Available EMI Plans
        </h2>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Annual Interest Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estimated Monthly Payment
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loan.emiPlans?.map((plan, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    **{plan.duration}**
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {plan.rate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-semibold">
                    (Calculation Required)
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
