import React from "react";
import { useNavigate } from "react-router";
import { FaMoneyBillWave, FaSearchDollar } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();

  const heroImageUrl =
    "https://images.unsplash.com/photo-1556740758-9430ef899482?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fGg%3D";

  return (
    <div
      className="relative w-full h-[70vh] sm:h-[70vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] my-6 sm:my-8 shadow-2xl rounded-2xl overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url(${heroImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm"></div>

      {/* Hero content */}
      <div className="relative z-10 text-center text-white px-3 sm:px-6 md:px-8 lg:px-16 max-w-full overflow-hidden">
        <div className="max-w-3xl sm:max-w-4xl mx-auto break-words">
          <h1 className="text-2xl xs:text-2xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-5 leading-snug sm:leading-tight tracking-wide">
            Empower Your Financial Journey
          </h1>

          <p className="mb-6 sm:mb-12 text-sm xs:text-sm sm:text-base md:text-lg font-medium text-gray-200 px-2 sm:px-4 break-words">
            Access competitive financing solutions with a seamless and secure
            digital application process.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5">
            <button
              onClick={() => navigate("/loan-details/1")}
              className="w-full sm:w-auto px-5 sm:px-8 py-3 text-sm sm:text-lg font-bold rounded-full bg-primary text-white shadow-xl hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <span className="flex items-center justify-center">
                <FaMoneyBillWave className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                Start Your Application
              </span>
            </button>

            <button
              onClick={() => navigate("/allloans")}
              className="w-full sm:w-auto px-5 sm:px-8 py-3 text-sm sm:text-lg font-bold rounded-full border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900 transition-colors duration-300"
            >
              <span className="flex items-center justify-center">
                <FaSearchDollar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                Compare All Options
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
