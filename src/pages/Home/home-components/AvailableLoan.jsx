import axios from "axios";
import React, { useEffect, useState } from "react";

const AvailableLoan = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get("http://localhost:3000/loans");
        setLoans(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);
  return (
    <div className="my-10">
      {loading ? (
        <div className=" flex justify-center items-center bg-gray-50">
          <div className="w-10 h-10 relative ">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          </div>
        </div>
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
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
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
