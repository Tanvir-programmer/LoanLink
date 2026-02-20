import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FaQuoteLeft,
  FaStar,
  FaRegSmile,
  FaRegPaperPlane,
  FaChartLine,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import toast from "react-hot-toast";

// Animated Counter Component
const Counter = ({ target, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(target);
      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const StarRating = ({ rating, setRating, interactive = false }) => (
  <div className="flex justify-center gap-1 text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        onClick={() => interactive && setRating(i + 1)}
        className={`h-5 w-5 transition-all ${
          i < rating ? "text-yellow-400 scale-110" : "text-gray-300"
        } ${interactive ? "cursor-pointer hover:scale-125" : ""}`}
      />
    ))}
  </div>
);

const FeedBack = () => {
  // Initial Reviews State
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Aisha M.",
      loanType: "Personal Loan",
      rating: 5,
      review:
        "The speed of approval was genuinely surprising. I had the funds in my account within 24 hours. A truly modern lending experience!",
    },
    {
      id: 2,
      name: "Ben C.",
      loanType: "Business Loan",
      rating: 4,
      review:
        "Excellent support team. They walked me through the commercial terms clearly. The document portal is very secure.",
    },
    {
      id: 3,
      name: "Carlos R.",
      loanType: "Home Equity",
      rating: 5,
      review:
        "Transparent rates and no hidden fees. LoanLink helped me consolidate my debt with zero stress. Highly professional.",
    },
  ]);

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [userRating, setUserRating] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const nextReview = () => {
    setDirection(1);
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
  };
  const prevReview = () => {
    setDirection(-1);
    setCurrentReviewIndex(
      (prev) => (prev - 1 + reviews.length) % reviews.length,
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value || "Anonymous";
    const feedbackText = e.target.feedback.value;

    if (userRating === 0) {
      toast.error("Please provide a star rating.");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      name: name,
      loanType: "New",
      rating: userRating,
      review: feedbackText,
    };

    // Add new feedback to the list
    setReviews([newFeedback, ...reviews]);
    setCurrentReviewIndex(0); // Show the new feedback immediately

    toast.success("Feedback submitted! Thank you very much");
    e.target.reset();
    setUserRating(0);
  };

  const currentReview = reviews[currentReviewIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      {/* 1. Customer Feedback Carousel */}
      <section className="relative">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold tracking-widest uppercase text-sm">
            Testimonials
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2">
            Trusted by Thousands
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReviewIndex}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 sm:p-14 rounded-3xl text-center relative"
            >
              <FaQuoteLeft className="absolute top-8 left-8 h-10 w-10 text-gray-100" />
              <StarRating rating={currentReview.rating} />
              <blockquote className="mt-8 text-xl sm:text-2xl leading-relaxed font-medium text-gray-800 italic">
                "{currentReview.review}"
              </blockquote>
              <div className="mt-8">
                <p className="font-bold text-lg text-gray-900">
                  {currentReview.name}
                </p>
                <p className="text-primary font-medium">
                  {currentReview.loanType} Customer
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-400 hover:text-primary p-4 rounded-full shadow-lg transition-all active:scale-90"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-gray-400 hover:text-primary p-4 rounded-full shadow-lg transition-all active:scale-90"
          >
            <FaChevronRight />
          </button>
        </div>
      </section>

      {/* 2. Feedback Submission Form */}
      <section className="grid md:grid-cols-2 gap-12 items-center bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-200">
        <div className="p-8 lg:p-16">
          <div className="inline-flex items-center justify-center p-3 bg-white shadow-sm rounded-xl mb-6">
            <FaRegPaperPlane className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Share Your Experience
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            Your insights help us refine our lending process.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 lg:p-12 shadow-xl space-y-5"
        >
          <div className="flex flex-col items-center mb-4">
            <label className="text-sm font-semibold text-gray-500 uppercase mb-2">
              Tap to Rate
            </label>
            <StarRating
              rating={userRating}
              setRating={setUserRating}
              interactive
            />
          </div>
          <input
            name="name"
            type="text"
            className="w-full bg-gray-50 border-none rounded-xl p-4 outline-none text-gray-800"
            placeholder="Full Name (Optional)"
          />
          <textarea
            name="feedback"
            rows="4"
            required
            className="w-full bg-gray-50 border-none rounded-xl p-4 outline-none text-gray-800"
            placeholder="Tell us about your experience..."
          />
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-xl text-lg font-bold text-white bg-primary hover:bg-primary/90 shadow-lg transition-all active:scale-[0.98]"
          >
            Submit Feedback
          </button>
        </form>
      </section>

      {/* 3. Key Statistics with Counter */}
      <section className="p-12 rounded-[2.5rem] bg-[#171d2e] text-white relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-2 border-l-2 border-primary/30 pl-6">
            <p className="text-primary font-bold tracking-tighter text-5xl">
              $<Counter target="250" suffix="M+" />
            </p>
            <p className="text-gray-400 text-sm font-semibold uppercase">
              Total Capital Disbursed
            </p>
          </div>
          <div className="space-y-2 border-l-2 border-primary/30 pl-6">
            <p className="text-primary font-bold tracking-tighter text-5xl">
              <Counter target="5" suffix=".0/5" duration={1} />
            </p>
            <p className="text-gray-400 text-sm font-semibold uppercase">
              Trustpilot Rating
            </p>
          </div>
          <div className="space-y-2 border-l-2 border-primary/30 pl-6">
            <p className="text-primary font-bold tracking-tighter text-5xl">
              <Counter target="98" suffix="%" />
            </p>
            <p className="text-gray-400 text-sm font-semibold uppercase">
              Retention Rate
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeedBack;
