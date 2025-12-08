import React from "react";
import { useNavigate } from "react-router";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase text-indigo-600 tracking-wider mb-2">
            Our Story, Our Commitment
          </p>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl">
            Empowering Your Financial Journey
          </h1>
          <p className="mt-5 text-xl text-gray-600 max-w-4xl mx-auto">
            LoanLink was founded on the belief that securing financial support
            should be transparent, fast, and tailored to your unique needs.
          </p>
        </div>

        {/* --- */}

        {/* Section 1: Our Mission */}
        <div className="bg-white p-10 rounded-xl shadow-2xl border-t-4 border-indigo-600 mb-16">
          <div className="flex flex-col md:flex-row items-start space-x-0 md:space-x-10">
            <div className="flex-shrink-0 mb-6 md:mb-0">
              <svg
                className="h-12 w-12 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3-.895-3-2 1.343-2 3-2zM9 10a3 3 0 116 0A3 3 0 019 10zM12 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"
                ></path>
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Core Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To simplify the complex world of lending by providing a
                seamless, digital platform where individuals and businesses can
                confidently find the right loan product. We are committed to
                using **cutting-edge technology** to deliver fast decisions and
                personalized advice, ensuring financial access for everyone.
              </p>
            </div>
          </div>
        </div>

        {/* --- */}

        {/* Section 2: Core Values Grid */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Values That Drive Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Value 1: Transparency */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <svg
              className="h-8 w-8 text-green-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Transparency
            </h3>
            <p className="text-gray-600">
              We provide clear terms and rates with **no hidden fees**. We
              believe trust starts with open communication.
            </p>
          </div>

          {/* Value 2: Security */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <svg
              className="h-8 w-8 text-red-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Security</h3>
            <p className="text-gray-600">
              Your data security is our top priority. We use **bank-grade
              encryption** to protect your sensitive information.
            </p>
          </div>

          {/* Value 3: Innovation */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <svg
              className="h-8 w-8 text-blue-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.663 17h4.673M12 3v18m-9-9h18"
              ></path>
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600">
              We continuously refine our platform to offer the **fastest
              application process** and the most competitive products.
            </p>
          </div>
        </div>

        {/* --- */}

        {/* Section 3: Call to Action (Focus on Trust) */}
        <div className="bg-indigo-600 text-white p-10 rounded-xl text-center shadow-2xl">
          <h2 className="text-4xl font-extrabold mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl opacity-90 mb-6 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have used LoanLink to
            achieve their goals. Start exploring your options today.
          </p>
          <button
            onClick={() => {
              navigate("/allloans");
            }}
            className="py-3 px-8 bg-white text-indigo-700 font-bold rounded-lg shadow-xl hover:bg-gray-100 transition duration-200 text-lg"
          >
            View All Loan Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
