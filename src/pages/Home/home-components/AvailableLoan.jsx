import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const AvailableLoan = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(
          "https://loan-link-server-two.vercel.app/loans"
        );
        setLoans(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);
  // ... existing code ...

  return (
    <div className="my-10">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.slice(0, 6).map((loan) => (
            <div
              key={loan.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={loan.imageUrl}
                alt={loan.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{loan.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{loan.description}</p>
                <p className="text-lg font-bold text-indigo-600 mb-4">
                  Max Limit: ${loan.maxLimit}
                </p>
                <button
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                  onClick={() => navigate(`/loan-details/${loan.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableLoan;
