import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import { FaShieldAlt, FaArrowLeft } from "react-icons/fa";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/loan-applications/${id}`
        );
        setLoan(res.data);
      } catch (err) {
        console.error("Error fetching loan:", err);
      }
    };
    fetchLoan();
  }, [id]);

  if (!loan) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center gap-4">
        <span className="loading loading-ring loading-lg text-indigo-600"></span>
        <p className="text-gray-500 animate-pulse">
          Initializing Secure Checkout...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-8 transition-colors"
      >
        <FaArrowLeft /> Back to Applications
      </button>

      <div className="grid md:grid-cols-2 gap-12 bg-white p-2 md:p-8 rounded-3xl shadow-2xl shadow-indigo-100 border border-gray-50">
        {/* Left Side: Summary */}
        <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-600 rounded-lg text-white">
              <FaShieldAlt size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Loan Product</span>
              <span className="font-semibold text-gray-800">
                {loan.loanTitle}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Applicant</span>
              <span className="font-semibold text-gray-800">
                {loan.firstName} {loan.lastName}
              </span>
            </div>
            <hr className="border-dashed border-indigo-200" />
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">
                Application Processing Fee
              </span>
              <span className="text-xl font-bold text-indigo-700">$10.00</span>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white rounded-xl text-xs text-gray-400 leading-relaxed italic">
            * This fee is non-refundable and covers the administrative
            verification of your loan documents.
          </div>
        </div>

        {/* Right Side: Stripe Form */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">
              Payment Details
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Complete your application by paying the fee below.
            </p>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm
              loan={loan}
              onPaymentSuccess={() => navigate("/dashboard/my-applied-loans")}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
