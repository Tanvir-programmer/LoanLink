import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import useRole from "../../context/useRole";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole();

  const [loan, setLoan] = useState(null);
  const [loanLoading, setLoanLoading] = useState(true);

  /* ---------------- ROLE LOGIC ---------------- */
  const userRole = role?.toLowerCase();
  const canApply = user && user.email && userRole === "user"; // ✅ only user can apply

  /* ---------------- EMI CALCULATION ---------------- */
  const calculateEMI = (principal, annualRate, duration) => {
    const P = parseFloat(String(principal).replace(/[^0-9.]/g, ""));
    const rate = parseFloat(String(annualRate).replace(/[^0-9.]/g, ""));
    const n = parseInt(String(duration).replace(/[^0-9]/g, ""), 10);

    if (!P || !rate || !n) return 0;

    const r = rate / 12 / 100;
    return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  /* ---------------- FETCH LOAN ---------------- */
  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/loans`);
        if (!res.ok) throw new Error("Failed to fetch loans");

        const loans = await res.json();
        const selectedLoan = loans.find((l) => l._id === id);

        setLoan(selectedLoan || null);
      } catch (error) {
        console.error(error);
        setLoan(null);
      } finally {
        setLoanLoading(false);
      }
    };

    fetchLoanDetails();
  }, [id]);

  /* ---------------- APPLY ---------------- */
  const handleApplyNow = () => {
    if (!canApply) return;
    navigate(`/loan-application/${id}`);
  };

  /* ---------------- LOADING ---------------- */
  if (loanLoading || authLoading || isRoleLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-indigo-600" />
        <p className="ml-4 text-lg font-medium text-gray-700">
          Loading Loan Details...
        </p>
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (!loan) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <p className="text-xl font-bold text-red-500">
          Loan details not found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="mx-auto max-w-4xl">
        {/* HEADER */}
        <div className="mb-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
              {loan.category}
            </p>
            <h1 className="mb-4 text-4xl font-extrabold text-gray-900">
              {loan.title}
            </h1>
            <p className="text-lg leading-relaxed text-gray-600">
              {loan.description}
            </p>
          </div>

          <div className="h-64 overflow-hidden rounded-xl border shadow-lg">
            <img
              src={loan.imageUrl || "https://via.placeholder.com/400x300"}
              alt={loan.title}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        {/* FINANCIAL INFO */}
        <div className="mb-12 flex flex-col gap-6 rounded-2xl border bg-slate-50 p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Interest Rate
              </p>
              <p className="mt-1 text-3xl font-black text-indigo-600">
                {loan.interest}%
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Max Limit
              </p>
              <p className="mt-1 text-3xl font-black text-gray-900">
                {loan.maxLimit}
              </p>
            </div>
          </div>

          <button
            onClick={handleApplyNow}
            disabled={!canApply}
            className={`w-full rounded-xl py-4 px-10 text-lg font-bold transition-all lg:w-auto
              ${
                canApply
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 shadow-lg shadow-indigo-200"
                  : "cursor-not-allowed bg-gray-200 text-gray-400"
              }`}
          >
            {!user
              ? "Login to Apply"
              : userRole !== "user"
              ? "Only Borrowers Can Apply"
              : "Apply For Loan"}
          </button>
        </div>

        {/* EMI TABLE */}
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Available EMI Plans
        </h2>

        <div className="overflow-hidden rounded-2xl border shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                  Annual Rate
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                  Monthly EMI
                </th>
              </tr>
            </thead>

            <tbody className="divide-y bg-white">
              {loan.emiPlans?.length ? (
                loan.emiPlans.map((plan, idx) => {
                  const emi = calculateEMI(
                    loan.maxLimit,
                    plan.rate,
                    plan.duration
                  );

                  return (
                    <tr key={idx} className="transition hover:bg-indigo-50/30">
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">
                        {plan.duration} months
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {plan.rate}%
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-indigo-600">
                        {emi.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-6 text-center text-gray-400"
                  >
                    No EMI plans available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
