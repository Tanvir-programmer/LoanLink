import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaQuoteLeft,
  FaStar,
  FaRegSmile,
  FaRegPaperPlane,
  FaChartLine,
} from "react-icons/fa";

// Mock Data
const mockReviews = [
  {
    id: 1,
    name: "Aisha M.",
    loanType: "Personal Loan",
    rating: 5,
    review: "Fast, transparent process. Highly recommend!",
    date: "Dec 2025",
  },
  {
    id: 2,
    name: "Ben C.",
    loanType: "Business Loan",
    rating: 4,
    review: "Great support, just slow document upload.",
    date: "Nov 2025",
  },
  {
    id: 3,
    name: "Carlos R.",
    loanType: "Home Equity",
    rating: 5,
    review: "Flawless experience. Trustworthy service.",
    date: "Oct 2025",
  },
];

// Star Rating Component
const StarRating = ({ rating }) => (
  <div className="flex justify-center text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

const FeedBack = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Dynamic carousel: auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentReviewIndex((prev) => (prev + 1) % mockReviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Manual navigation
  const nextReview = () => {
    setDirection(1);
    setCurrentReviewIndex((prev) => (prev + 1) % mockReviews.length);
  };
  const prevReview = () => {
    setDirection(-1);
    setCurrentReviewIndex(
      (prev) => (prev - 1 + mockReviews.length) % mockReviews.length
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your valuable feedback!");
    e.target.reset();
  };

  const currentReview = mockReviews[currentReviewIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* 1. Customer Feedback Carousel */}
      <section className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-primary/50">
        <div className="text-center mb-10">
          <FaRegSmile className="h-10 w-10 text-primary mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-gray-800">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 mt-2">
            Hear real stories from people who used LoanLink.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReviewIndex}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 p-6 sm:p-10 rounded-lg text-center"
            >
              <FaQuoteLeft className="h-8 w-8 text-primary/70 mb-4 mx-auto" />
              <StarRating rating={currentReview.rating} />
              <blockquote className="mt-4 text-lg italic text-gray-700">
                "{currentReview.review}"
              </blockquote>
              <p className="mt-4 font-semibold">{currentReview.name}</p>
              <p className="text-sm text-primary">
                {currentReview.loanType} Customer
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            &larr;
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            &rarr;
          </button>
        </div>
      </section>

      {/* 2. Feedback Submission Form */}
      <section className="bg-gray-100 p-8 rounded-xl shadow-inner">
        <div className="text-center mb-10">
          <FaRegPaperPlane className="h-10 w-10 text-secondary mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-gray-800">
            Share Your Experience
          </h2>
          <p className="text-gray-600 mt-2">
            Help us improve by submitting your honest feedback.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-primary focus:border-primary"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700"
            >
              Rating
            </label>
            <select
              id="rating"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-primary focus:border-primary bg-white"
            >
              <option value="">Select a rating</option>
              <option value="5">5 Stars - Excellent</option>
              <option value="4">4 Stars - Very Good</option>
              <option value="3">3 Stars - Good</option>
              <option value="2">2 Stars - Fair</option>
              <option value="1">1 Star - Poor</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-700"
            >
              Your Feedback
            </label>
            <textarea
              id="feedback"
              rows="4"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-primary focus:border-primary"
              placeholder="Tell us about your application, approval, or service experience..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Submit Feedback
          </button>
        </form>
      </section>

      {/* 3. Key Statistics & Trust */}
      <section className="p-8 rounded-xl bg-primary text-white shadow-xl">
        <div className="text-center mb-10">
          <FaChartLine className="h-10 w-10 mx-auto mb-3 text-white" />
          <h2 className="text-3xl font-bold">Our Performance & Trust</h2>
          <p className="mt-2 text-primary-200">
            Building confidence through verified numbers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-4 bg-primary/90 rounded-lg">
            <p className="text-5xl font-extrabold">$250M+</p>
            <p className="mt-2 text-lg font-medium">Loans Disbursed</p>
          </div>
          <div className="p-4 bg-primary/90 rounded-lg">
            <p className="text-5xl font-extrabold">4.8/5</p>
            <p className="mt-2 text-lg font-medium">Average Client Rating</p>
          </div>
          <div className="p-4 bg-primary/90 rounded-lg">
            <p className="text-5xl font-extrabold">98%</p>
            <p className="mt-2 text-lg font-medium">Customer Satisfaction</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeedBack;
