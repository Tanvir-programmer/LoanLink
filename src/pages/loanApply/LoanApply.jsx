import React, { useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider"; // adjust path
import axios from "axios";

const LoanApply = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    nationalId: "",
    incomeSource: "",
    monthlyIncome: "",
    loanAmount: "",
    loanReason: "",
    address: "",
    extraNotes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationData = {
      ...formData,

      email: user?.email,
      loanTitle: "Micro Loan",
      interestRate: "8%",

      status: "Pending",
      applicationFeeStatus: "unpaid",

     
      createdAt: new Date(),
    };

    try {
      const res = await axios.post(
        "https://your-server-url.com/loan-applications",
        applicationData
      );

      if (res.data.insertedId) {
        alert("Loan Application Submitted!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Loan Application Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Auto-Filled Fields (Read Only) */}
        <div>
          <label className="font-semibold">User Email</label>
          <input
            type="text"
            value={user?.email}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Loan Title</label>
          <input
            type="text"
            value="Micro Loan"
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Interest Rate</label>
          <input
            type="text"
            value="8%"
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* User Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="firstName"
            onChange={handleChange}
            required
            placeholder="First Name"
            className="p-2 border rounded w-full"
          />
          <input
            name="lastName"
            onChange={handleChange}
            required
            placeholder="Last Name"
            className="p-2 border rounded w-full"
          />
        </div>

        <input
          name="contactNumber"
          onChange={handleChange}
          required
          placeholder="Contact Number"
          className="p-2 border rounded w-full"
        />

        <input
          name="nationalId"
          onChange={handleChange}
          required
          placeholder="National ID / Passport Number"
          className="p-2 border rounded w-full"
        />

        <input
          name="incomeSource"
          onChange={handleChange}
          required
          placeholder="Income Source"
          className="p-2 border rounded w-full"
        />

        <input
          name="monthlyIncome"
          onChange={handleChange}
          required
          type="number"
          placeholder="Monthly Income"
          className="p-2 border rounded w-full"
        />

        <input
          name="loanAmount"
          onChange={handleChange}
          required
          type="number"
          placeholder="Loan Amount"
          className="p-2 border rounded w-full"
        />

        <textarea
          name="loanReason"
          onChange={handleChange}
          required
          placeholder="Reason for Loan"
          className="p-2 border rounded w-full"
        />

        <textarea
          name="address"
          onChange={handleChange}
          required
          placeholder="Address"
          className="p-2 border rounded w-full"
        />

        <textarea
          name="extraNotes"
          onChange={handleChange}
          placeholder="Extra Notes (Optional)"
          className="p-2 border rounded w-full"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default LoanApply;
