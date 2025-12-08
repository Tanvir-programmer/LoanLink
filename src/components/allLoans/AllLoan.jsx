import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// Loan Card Component
const LoanCard = ({ loan }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/loan-details/${loan.id}`);
  };

  return (
    <div
      className="flex flex-col bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden
                    transition duration-300 hover:shadow-2xl hover:ring-2 hover:ring-indigo-500/50"
    >
      <div className="h-40 overflow-hidden">
        <img
          src={loan.imageUrl}
          alt={`Image for ${loan.title}`}
          className="w-full h-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-xs font-bold uppercase text-indigo-700 tracking-widest mb-2">
          {loan.category}
        </p>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">
          {loan.title}
        </h3>

        <div className="flex justify-between items-center text-sm mb-6 border-y border-gray-100 py-4 mt-auto">
          <div>
            <p className="text-gray-500 font-medium">Interest Rate</p>
            <p className="text-xl font-bold text-gray-800 mt-1">
              {loan.interest}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 font-medium">Max Limit</p>
            <p className="text-xl font-bold text-gray-800 mt-1">
              {loan.maxLimit}
            </p>
          </div>
        </div>

        <button
          className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg 
                            shadow-lg hover:bg-indigo-700 transition duration-150 ease-in-out
                            focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// All Loans Page Component
const AllLoan = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Accessing the file at the project root path
    const fetchLoans = async () => {
      try {
        // The URL is just the filename because it is in the public folder
        const response = await fetch("/loandata.json");
        if (!response.ok) {
          throw new Error("Failed to fetch loan data");
        }
        const data = await response.json();
        setLoans(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-gray-700">Loading loan offerings...</p>
      </div>
    );
  }

  if (loans.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-gray-700">No loan offerings found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="mb-14 text-center">
        <h2 className="text-5xl font-extrabold text-gray-900 tracking-tighter sm:text-6xl">
          Financial Solutions Made Simple
        </h2>
        <p className="mt-5 text-xl text-gray-600 max-w-3xl mx-auto">
          Browse our diverse range of loan products designed to meet every
          financial goal.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {loans.map((loan) => (
          <LoanCard key={loan.id} loan={loan} />
        ))}
      </div>
    </div>
  );
};

export default AllLoan;
