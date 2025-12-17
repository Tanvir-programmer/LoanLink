import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaLock, FaCreditCard, FaCheckCircle } from "react-icons/fa";

const CheckoutForm = ({ loan, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false); // ✅ Track success state

  useEffect(() => {
    if (loan?._id) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
          price: 10,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          toast.error("Payment initialization failed");
        });
    }
  }, [loan]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (card == null) return;

    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: `${loan?.firstName} ${loan?.lastName}` || "Anonymous",
            email: loan?.userEmail || "unknown@email.com",
          },
        },
      }
    );

    if (error) {
      toast.error(error.message);
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_API_URL}/loan-applications/payment/${
            loan._id
          }`,
          { transactionId: paymentIntent.id }
        );

        if (response.data.modifiedCount > 0) {
          setSucceeded(true); // ✅ Show success UI
          toast.success("Payment Successful!");

          // Wait 2 seconds so the user can see the success message, then redirect
          setTimeout(() => {
            onPaymentSuccess();
          }, 2500);
        }
      } catch (patchError) {
        toast.error("Database update failed.");
      } finally {
        setProcessing(false);
      }
    }
  };

  // ✅ New Success UI
  if (succeeded) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-green-50 rounded-2xl border border-green-200 animate-in fade-in zoom-in duration-300">
        <FaCheckCircle className="text-green-500 text-6xl" />
        <h2 className="text-2xl font-bold text-gray-800">
          Payment Successful!
        </h2>
        <p className="text-gray-500 text-center">
          Thank you. Your loan application is now being processed.
          <br /> Redirecting you back...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
          <FaCreditCard className="text-indigo-500" /> Credit or Debit Card
        </label>
        <div className="p-4 border-2 border-gray-100 rounded-xl bg-gray-50 focus-within:border-indigo-500 transition-all">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#1f2937",
                  "::placeholder": { color: "#9ca3af" },
                },
                invalid: { color: "#ef4444" },
              },
            }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 ${
            processing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
          }`}
        >
          {processing ? (
            <div className="flex items-center justify-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              Verifying...
            </div>
          ) : (
            "Pay $10.00 Securely"
          )}
        </button>

        <p className="flex items-center gap-2 text-xs text-gray-400">
          <FaLock className="text-green-500" /> Secure SSL Encrypted Payment
        </p>
      </div>
    </form>
  );
};

export default CheckoutForm;
