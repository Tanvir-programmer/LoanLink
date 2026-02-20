import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  FaArrowRight,
  FaShieldAlt,
  FaSearch,
  FaChartLine,
  FaRegClock,
} from "react-icons/fa";
import LoadingSpinner from "../Shared/LoadingSpinner";

// --- Professional Loan Card Component ---
const LoanCard = ({ loan }) => {
  const navigate = useNavigate();

  const handleImgError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop";
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-2 h-full overflow-hidden">
      {/* Category Tag */}
      <div className="absolute top-4 left-4 z-20">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur shadow-sm rounded-full border border-slate-100">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">
            {loan.category}
          </span>
        </div>
      </div>

      {/* Hero Image Section */}
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
            Verified Finance
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
            {loan.description ||
              "Tailored financial solutions designed to empower your future with flexible repayment terms."}
          </p>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-2 gap-0 my-6 py-4 border-y border-slate-50">
          <div className="border-r border-slate-100 pr-4">
            <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest mb-1">
              Interest Rate
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-indigo-600">
                {loan.interest}
              </span>
              <span className="text-[9px] font-bold text-slate-400">APR</span>
            </div>
          </div>
          <div className="pl-6">
            <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest mb-1">
              Max Limit
            </p>
            <p className="text-xl font-black text-slate-800">{loan.maxLimit}</p>
          </div>
        </div>

        {/* Professional Button */}
        <button
          onClick={() => navigate(`/loan-details/${loan._id}`)}
          className="group/btn w-full py-3.5 bg-slate-900 text-white text-sm font-bold rounded-2xl transition-all duration-300 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 flex items-center justify-center gap-2"
        >
          <span>Review Terms</span>
          <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const AllLoan = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLoans = async (search = "") => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/loans?search=${search}`,
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setLoans(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLoans(searchTerm);
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen">
      {/* Dynamic Header Section */}
      <section className="relative pt-20 pb-16 px-4 bg-[#171d2e] overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -ml-10 -mb-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                <FaChartLine /> Market-Leading Rates
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6">
                Flexible Financing <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
                  For Every Ambition.
                </span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed">
                Choose from our curated selection of verified loan products with
                instant eligibility checks and transparent fee structures.
              </p>
            </div>

            {/* Premium Search Box */}
            <div className="w-full lg:max-w-md">
              <form onSubmit={handleSearch} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative flex items-center bg-[#1e263d] rounded-2xl p-2 border border-slate-700/50">
                  <FaSearch className="ml-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search by category or title..."
                    className="bg-transparent border-none text-white focus:ring-0 w-full px-4 py-3 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
                  >
                    Find
                  </button>
                </div>
                <div className="mt-3 flex gap-4 text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
                  <span className="flex items-center gap-1">
                    <FaRegClock /> 2-Min Approval
                  </span>
                  <span className="flex items-center gap-1">
                    <FaShieldAlt /> Encrypted Data
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <LoadingSpinner />
            <p className="text-slate-400 text-sm font-medium animate-pulse">
              Syncing latest market rates...
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
                Available Programs ({loans.length})
              </h2>
              <div className="h-px flex-grow mx-8 bg-slate-100 hidden md:block" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {loans.map((loan) => (
                <LoanCard key={loan._id} loan={loan} />
              ))}
            </div>

            {loans.length === 0 && (
              <div className="text-center py-32 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaSearch className="text-slate-300 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  No matching results
                </h3>
                <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                  We couldn't find any loans matching "{searchTerm}". Try
                  adjusting your filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    fetchLoans("");
                  }}
                  className="text-indigo-600 font-black text-sm uppercase tracking-widest hover:text-indigo-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Professional Footer Call to Action */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="bg-black rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
            Need a Custom Solution?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto relative z-10">
            Our financial advisors are available 24/7 to help you structure a
            loan that fits your unique business requirements.
          </p>
          <button className="bg-white text-indigo-700 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-indigo-50 transition-all shadow-xl relative z-10">
            Speak to an Expert
          </button>
        </div>
      </section>
    </div>
  );
};

export default AllLoan;
