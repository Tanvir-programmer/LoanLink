import React from "react";
import { ScaleLoader } from "react-spinners";

/**
 * Professional Loading Spinner
 * Matches the LoanLink Pro Indigo brand theme.
 * * @param {boolean} smallHeight - If true, uses a compact height for sections.
 * @param {string} message - Optional custom text to display under the spinner.
 */
const LoadingSpinner = ({ smallHeight = false, message = "Loading..." }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center w-full transition-opacity duration-500 ease-in-out ${
        smallHeight ? "h-[250px]" : "min-h-[70vh]"
      }`}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="relative flex flex-col items-center">
        {/* The Spinner - Using Indigo-600 to match professional branding */}
        <ScaleLoader
          color="#4F46E5"
          height={40}
          width={5}
          radius={3}
          margin={3}
          speedMultiplier={1.2}
        />

        {/* Subtle Branding Text */}
        <p className="mt-6 text-sm font-medium tracking-wide text-slate-500 dark:text-slate-400 animate-pulse">
          {message}
        </p>
      </div>

      {/* Optional: Subtle decorative element */}
      <div className="absolute inset-0 bg-white/10 dark:bg-slate-900/10 pointer-events-none" />
    </div>
  );
};

export default LoadingSpinner;
