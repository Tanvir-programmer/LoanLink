import React from "react";
import { useNavigate } from "react-router";
import { FaMoneyBillWave, FaSearchDollar } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();

  const heroImageUrl = "https://i.ibb.co.com/VcQQg98W/bg-image.png";

  return (
    <section
      className="relative w-full min-h-[60vh] md:h-screen overflow-hidden shadow-lg flex items-center"
      style={{
        backgroundImage: `url(${heroImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Professional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/40"></div>

      {/* Content */}
      <div className="relative z-10 w-full py-16 md:py-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]">
              Smart Financing,
              <span className="block text-primary mt-2">
                Built for Your Future
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-200 leading-relaxed max-w-lg">
              Apply for trusted loan solutions through a secure, transparent,
              and fully digital process — designed for speed and clarity.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/allloans")}
                className="inline-flex items-center cursor-pointer justify-center px-8 py-4 text-base font-semibold rounded-lg bg-primary text-white shadow-lg hover:bg-primary/90 transition-all active:scale-95"
              >
                <FaMoneyBillWave className="mr-2 text-xl" />
                Apply Now
              </button>

              <button
                onClick={() => navigate("/allloans")}
                className="cursor-pointer inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg border border-white/50 text-white backdrop-blur-sm hover:bg-white hover:text-gray-900 transition-all active:scale-95"
              >
                <FaSearchDollar className="mr-2 text-xl" />
                View All Loans
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
