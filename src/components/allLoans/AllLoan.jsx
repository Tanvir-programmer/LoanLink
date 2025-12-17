import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "../Shared/LoadingSpinner";

// Loan Card Component
const LoanCard = ({ loan }) => {
  const navigate = useNavigate();
  const handleViewDetails = () => {
    navigate(`/loan-details/${loan._id}`);
  };

  return (
    <div
      className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden 
                 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
    >
      {/* Fixed Image Aspect Ratio */}
      <div className="relative h-52 w-full overflow-hidden">
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-700 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
            {loan.category}
          </span>
        </div>
        <img
          src={loan.imageUrl}
          alt={loan.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {loan.title}
        </h3>

        {/* Added a short description line-clamp to keep things tidy */}
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow">
          {loan.description ||
            "Secure your financial future with our flexible loan options tailored for your needs."}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-50 mb-6">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Interest Rate
            </p>
            <p className="text-lg font-bold text-indigo-600">{loan.interest}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Max Limit
            </p>
            <p className="text-lg font-bold text-gray-800">{loan.maxLimit}</p>
          </div>
        </div>

        <button
          className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl
                     shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-all 
                     active:scale-95 flex items-center justify-center gap-2"
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
    const fetchLoans = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/loans`);
        if (!response.ok) throw new Error("Failed to fetch loan data");
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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
            Explore Our <span className="text-indigo-600">Loan Options</span>
          </h2>
          <p className="text-lg text-gray-600">
            Find the perfect financing solution for your personal or business
            needs with transparent rates and fast approval.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loans.map((loan) => (
            <LoanCard key={loan._id} loan={loan} />
          ))}
        </div>

        {loans.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-xl text-gray-400 font-medium">
              No active loan offerings found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllLoan;
