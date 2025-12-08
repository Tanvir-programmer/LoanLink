import React, { useState } from "react";

const ContactUs = () => {
  // State to handle form inputs and submission feedback
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend API here (e.g., using fetch or Axios).

    // Mock submission success for demonstration:
    console.log("Form Data Submitted:", formData);
    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Clear status after 5 seconds
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase text-indigo-600 tracking-wider mb-2">
            Get in Touch
          </p>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl">
            We're Here to Help
          </h1>
          <p className="mt-5 text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our loan products or need support with your
            application? Contact our team directly.
          </p>
        </div>

        {/* Content Grid (Details & Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Details Column */}
          <div className="lg:col-span-1 p-6 bg-indigo-50 rounded-xl shadow-lg border border-indigo-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <svg
                  className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Email Support
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    support@loanlink.com
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <svg
                  className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.5l1.96-1.14a1 1 0 011.08 0l1.96 1.14H19a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                  ></path>
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Call Center
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    +1 (800) 555-0199
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <svg
                  className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Office Location
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    123 Financial Tower, Suite 400
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>

            {status === "success" && (
              <div
                className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
                role="alert"
              >
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg 
                            shadow-lg hover:bg-indigo-700 transition duration-150 ease-in-out
                            focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
              >
                Submit Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
