import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { FaArrowRight, FaMoneyBillWave, FaClock } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

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
    <div className="my-16 w-11/12 mx-auto">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-6xl font-bold text-black mb-3">
          Our Loan Services
        </h2>
        <div className="w-24 h-1 bg-black mx-auto rounded-full mb-4"></div>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Flexible and reliable financial solutions designed to help you achieve
          your goals with ease and confidence.
        </p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : loans.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            No loan services available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loans.slice(0, 6).map((loan) => (
            <div
              key={loan._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden group"
            >
              {/* Image Section */}
              <div className="relative m-4">
                <img
                  src={loan.imageUrl}
                  alt={loan.title}
                  className="w-full h-52 object-cover rounded-xl"
                />
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                {/* Title */}
                <h3 className="text-xl font-bold mb-2">{loan.title}</h3>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {loan.description}
                </p>

                {/* Info Section */}
                <div className="flex items-center justify-between text-gray-500 text-sm mb-5">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-indigo-500" />
                    <span>12 - 60 Months</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-300 pt-4 flex items-center justify-between">
                  {/* Max Limit */}
                  <div>
                    <p className="text-xs text-gray-400">Maximum Loan</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      ${loan.maxLimit}
                    </p>
                  </div>

                  {/* Button */}
                  <button
                    className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
                    onClick={() => navigate(`/loan-details/${loan._id}`)}
                  >
                    View
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableLoan;
