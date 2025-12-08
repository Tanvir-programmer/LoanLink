import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

// Mock Authentication Status (Simulates fetching user state)
const useAuthStatus = () => {
  const [isLoggedIn] = useState(true);
  const [userRole] = useState("User");

  return { isLoggedIn, userRole };
};

const LoanDetails = () => {
  const { loanId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, userRole } = useAuthStatus();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  // Feature: Apply Now Button Logic
  const canApply = isLoggedIn && userRole !== "Admin" && userRole !== "Manager";

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        // Fetch ALL data from the public folder
        const response = await fetch("/mockData.json");
        if (!response.ok) {
          throw new Error("Failed to fetch loan data");
        }
        const allLoans = await response.json();

        // Find the specific loan details based on the URL ID
        const selectedLoan = allLoans.find((l) => l.id === parseInt(loanId));
        setLoan(selectedLoan);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanDetails();
  }, [loanId]);

  const handleApplyNow = () => {
    if (canApply) {
      // Behavior: Clicking redirects to the Loan Application Form
      navigate(`/loan-application/${loanId}`);
    }
  };

  if (loading) {
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
        {/* Loan Image, Title, Description, and Category */}
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

        {/* Interest Rate, Max Limit, and Apply Button */}
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
            className={`py-3 px-8 text-lg font-semibold rounded-lg transition duration-200 w-full lg:w-auto
                            ${
                              canApply
                                ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/50"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
            title={
              !isLoggedIn
                ? "Please log in to apply"
                : userRole !== "User"
                ? `Admins/Managers cannot apply`
                : "Apply for this loan"
            }
          >
            Apply Now
          </button>
        </div>

        {/* Available EMI Plans */}
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
              {loan.emiPlans &&
                loan.emiPlans.map((plan, index) => (
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
