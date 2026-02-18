import React from "react";
import { FaEdit, FaClipboardCheck, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaEdit className="text-white w-6 h-6" />,
      title: "Fill Out the Application",
      description:
        "Provide your personal information, income details, and the amount you want to borrow.",
    },
    {
      id: 2,
      icon: <FaClipboardCheck className="text-white w-6 h-6" />,
      title: "Application Review",
      description:
        "Our loan officer reviews your application and verifies the information submitted.",
    },
    {
      id: 3,
      icon: <FaCheckCircle className="text-white w-6 h-6" />,
      title: "Get Approved",
      description:
        "Once approved, the funds are processed and released securely to your account.",
    },
  ];

  return (
    <div className="py-16">
      <div className="text-center mb-6">
        <h2 className="text-6xl font-bold  mb-3">How It Works</h2>
        <div className="w-24 h-1 bg-black mx-auto rounded-full mb-4"></div>

        <p className="text-gray-500  max-w-xl mx-auto">
          Follow these simple steps to apply for a loan and receive approval.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="group relative bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1"
          >
            {/* Background Step Number */}
            <span className="absolute top-6 right-6 text-6xl font-bold text-gray-200 pointer-events-none select-none">
              {step.id}
            </span>

            {/* Icon */}
            <div className="mx-auto mb-6 w-16 h-16 bg-blue-600 text-blue-600 rounded-2xl flex items-center justify-center">
              {step.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 leading-relaxed text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
