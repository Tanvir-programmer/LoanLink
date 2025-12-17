import React from "react";
import { useNavigate } from "react-router";
import { FaMoneyBillWave, FaSearchDollar } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();

  const heroImageUrl =
    "https://images.unsplash.com/photo-1556740758-9430ef899482?q=80&w=1974&auto=format&fit=crop";

  return (
    <section
      className="relative w-full h-[55vh] md:h-[60vh] mt-6 rounded-xl overflow-hidden shadow-lg"
      style={{
        backgroundImage: `url(${heroImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Professional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/40"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Smart Financing,
              <span className="block text-primary mt-1">
                Built for Your Future
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-base text-gray-200 leading-relaxed">
              Apply for trusted loan solutions through a secure, transparent,
              and fully digital process — designed for speed and clarity.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/allloans")}
                className="inline-flex items-center justify-center px-7 py-3 text-sm sm:text-base font-semibold rounded-lg bg-primary text-white shadow-md hover:bg-primary/90 transition"
              >
                <FaMoneyBillWave className="mr-2" />
                Apply Now
              </button>

              <button
                onClick={() => navigate("/allloans")}
                className="inline-flex items-center justify-center px-7 py-3 text-sm sm:text-base font-semibold rounded-lg border border-white/70 text-white hover:bg-white hover:text-gray-900 transition"
              >
                <FaSearchDollar className="mr-2" />
                View All Loans
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-gray-300 text-xs tracking-wide opacity-80 hidden md:block">
        Scroll to explore ↓
      </div>
    </section>
  );
};

export default Hero;
