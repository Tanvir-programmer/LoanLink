import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import {
  FaArrowRight,
  FaClock,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";

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

  // Image fallback handler
  const handleImgError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop";
  };

  return (
    <div className="my-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* --- Section Header --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
            <FaChartLine /> Featured Programs
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Our Loan <span className="text-indigo-600">Services</span>
          </h2>
          <p className="text-lg text-slate-500 mt-4 leading-relaxed">
            Flexible and reliable financial solutions designed to help you
            achieve your goals with transparent rates and fast approval.
          </p>
        </div>
        <button
          onClick={() => navigate("/allloans")}
          className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all group"
        >
          View All Loans{" "}
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <LoadingSpinner />
        </div>
      ) : loans.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">
            No loan services available at the moment.
          </p>
        </div>
      ) : (
        /* --- Professional Grid --- */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {loans.slice(0, 6).map((loan) => (
            <div
              key={loan._id}
              className="group relative flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-2 overflow-hidden h-full"
            >
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-20">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur shadow-sm rounded-full border border-slate-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">
                    {loan.category || "General"}
                  </span>
                </div>
              </div>

              {/* Image Section */}
              <div className="relative h-52 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10" />
                <img
                  src={loan.imageUrl}
                  alt={loan.title}
                  onError={handleImgError}
                  className="w-full h-full object-cover transition-transform duration-700 scale-105 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white/90">
                  <FaShieldAlt className="text-indigo-400 text-xs" />
                  <span className="text-[11px] font-bold tracking-tight uppercase">
                    Verified Partner
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-7 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {loan.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">
                    {loan.description}
                  </p>

                  <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                    <FaClock className="text-indigo-500/70" />
                    <span>Term: 12 - 60 Months</span>
                  </div>
                </div>

                {/* Data Stats Grid */}
                <div className="grid grid-cols-2 gap-0 my-6 py-4 border-y border-slate-50">
                  <div className="border-r border-slate-100 pr-4">
                    <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest mb-1">
                      Rate From
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-indigo-600">
                        {loan.interest || "5.5%"}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">
                        APR
                      </span>
                    </div>
                  </div>
                  <div className="pl-6">
                    <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest mb-1">
                      Max Capital
                    </p>
                    <p className="text-xl font-black text-slate-800">
                      ${loan.maxLimit?.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Professional Button */}
                <button
                  onClick={() => navigate(`/loan-details/${loan._id}`)}
                  className="group/btn w-full py-3.5 bg-slate-900 text-white text-sm font-bold rounded-2xl transition-all duration-300 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 flex items-center justify-center gap-2"
                >
                  <span>View Details</span>
                  <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
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
