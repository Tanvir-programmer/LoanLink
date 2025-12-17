import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const AvailableLoan = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(`${API_URL}/loans`);
        setLoans(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [API_URL]);

  return (
    <div className="my-10">
      {/* ✅ HEADING (added back, no style changes elsewhere) */}
      <h2 className="text-4xl font-bold mb-6 text-primary text-center">
        Available Loan Options
      </h2>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.slice(0, 6).map((loan) => (
            <div
              key={loan._id}
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
                  onClick={() => navigate(`/loan-details/${loan._id}`)}
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
