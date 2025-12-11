import React from "react";
import { FaEdit, FaClipboardCheck, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaEdit className="text-primary w-12 h-12" />,
      title: "Fill Out the Application",
      description:
        "Provide your personal information, income details, and the amount you want to borrow.",
    },
    {
      id: 2,
      icon: <FaClipboardCheck className="text-primary w-12 h-12" />,
      title: "Application Review",
      description:
        "Our loan officer reviews your application and verifies the information submitted.",
    },
    {
      id: 3,
      icon: <FaCheckCircle className="text-primary w-12 h-12" />,
      title: "Get Approved",
      description:
        "Once approved, the funds are processed and released securely to your account.",
    },
  ];

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-primary mb-3">How It Works</h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Follow these simple steps to apply for a loan and receive approval.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-base-100 shadow-lg border rounded-xl p-8 text-center hover:shadow-2xl transition duration-300 relative"
          >
            <div className="flex justify-center mb-6">{step.icon}</div>

            <h3 className="text-xl font-semibold text-base-content mb-3">
              {step.title}
            </h3>

            <p className="text-gray-500">{step.description}</p>

            <span className=" text-5xl font-bold text-gray-700 ">
              {step.id}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
