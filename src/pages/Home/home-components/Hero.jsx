import React from "react";
import { useNavigate } from "react-router";
import { FaMoneyBillWave, FaSearchDollar } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();

  // The image URL should be replaced with a meaningful, high-quality image related to finance,
  // home ownership, or future planning.
  const heroImageUrl =
    "https://images.unsplash.com/photo-1556740758-9430ef899482?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    // Hero container with full width and height set to define its space
    <div
      className="hero min-h-[500px] rounded-xl my-8 shadow-xl overflow-hidden max-h-(10vh)"
      style={{
        backgroundImage: `url(${heroImageUrl})`,
      }}
    >
      {/* Overlay to darken the image and make text readable */}
      <div className="hero-overlay bg-black bg-opacity-60"></div>

      {/* Hero Content */}
      <div className="hero-content text-center text-neutral-content py-16">
        <div className="max-w-3xl">
          {/* Descriptive Text */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-wider">
            Finance Your Future, Today.
          </h1>
          <p className="mb-10 text-xl font-light text-gray-200">
            Unlock the funds you need with LoanLink. We offer competitive rates
            and a straightforward application process for personal, home, and
            business loans.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Primary CTA: Apply for Loan (Redirects to Application Form) */}
            <button
              onClick={() => navigate("/loan-details/1")} // Redirect to your application route
              className="btn btn-primary btn-lg rounded-full shadow-2xl transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-primary/50 text-base-100 font-semibold"
            >
              <FaMoneyBillWave className="w-5 h-5 mr-2" />
              Apply for Popular Loan
            </button>

            {/* Secondary CTA: Explore Loans (Redirects to a loans list/details page) */}
            <button
              onClick={() => navigate("/allloans")} // Redirect to your loan products route
              className="btn btn-outline btn-lg rounded-full text-white border-white hover:bg-white hover:text-primary transition-colors duration-300 font-semibold"
            >
              <FaSearchDollar className="w-5 h-5 mr-2" />
              Explore Loan Options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
