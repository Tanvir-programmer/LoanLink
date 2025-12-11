import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

// --- Form Field Helper Components (Unchanged) ---
const InputField = ({
  label,
  name,
  register,
  errors,
  type = "text",
  placeholder,
  required = true,
  ...rest
}) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      type={type}
      // Note: The placeholder prop is now defined in the main component usage
      placeholder={placeholder || label}
      {...register(name, {
        required: required ? `${label} is required` : false,
      })}
      className="p-3 border border-gray-300 rounded-lg w-full shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150 ease-in-out bg-white"
      {...rest}
    />
    {errors[name] && (
      <p className="text-red-600 text-xs font-medium mt-1">
        {errors[name].message}
      </p>
    )}
  </div>
);

const TextAreaField = ({
  label,
  name,
  register,
  errors,
  placeholder,
  rows = 3,
  required = true,
  ...rest
}) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name}
      rows={rows}
      // Note: The placeholder prop is now defined in the main component usage
      placeholder={placeholder || label}
      {...register(name, {
        required: required ? `${label} is required` : false,
      })}
      className="p-3 border border-gray-300 rounded-lg w-full shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150 ease-in-out bg-white resize-y"
      {...rest}
    />
    {errors[name] && (
      <p className="text-red-600 text-xs font-medium mt-1">
        {errors[name].message}
      </p>
    )}
  </div>
);

// --- Main Component ---

const LoanApply = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmission = async (data) => {
    // Ensure numeric fields are correctly typed before sending
    const applicationData = {
      ...data,
      email: user?.email,
      loanTitle: "Micro Loan",
      interestRate: "8%",
      status: "Pending",
      applicationFeeStatus: "Unpaid",
      createdAt: new Date(),
      monthlyIncome: parseFloat(data.monthlyIncome),
      loanAmount: parseFloat(data.loanAmount),
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/apply-loan",
        applicationData
      );

      if (res.data.insertedId) {
        toast.success("Application Submitted!");
        reset();
      } else {
        toast.error(
          "Submission failed: Server returned an unexpected response."
        );
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(
        "Application failed to submit. Please verify your details and connection."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl border border-gray-200 divide-y divide-gray-200">
        {/* --- Header Section --- */}
        <div className="p-8 sm:p-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-800 tracking-tight">
            Micro Loan Application
          </h1>
          <p className="text-gray-500 mt-2 text-md sm:text-lg">
            Complete the sections below to fast-track your application. All
            fields marked with <span className="text-red-500">*</span> are
            required.
          </p>
        </div>

        {/* --- Loan Summary Overview (Consistent Branding) --- */}
        <div className="bg-blue-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
            <span className="mr-2">🏦</span> Loan Product Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 border border-blue-200 rounded-lg bg-white/70">
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Loan Type
              </p>
              <p className="text-lg font-bold text-gray-800 mt-0.5">
                Micro Loan
              </p>
            </div>
            <div className="p-3 border border-blue-200 rounded-lg bg-white/70">
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Fixed Interest Rate
              </p>
              <p className="text-lg font-bold text-green-600 mt-0.5">8% APR</p>
            </div>
            <div className="p-3 border border-blue-200 rounded-lg bg-white/70">
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Application Email
              </p>
              <p className="text-sm font-medium text-gray-700 mt-0.5 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* --- Application Form --- */}
        <form
          onSubmit={handleSubmit(handleFormSubmission)}
          className="space-y-12 p-8 sm:p-10"
        >
          {/* 1. Applicant Information */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500/50 pb-2">
              1. Applicant Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Legal First Name"
                name="firstName"
                register={register}
                errors={errors}
                placeholder="Enter your legal first name" // Updated
              />
              <InputField
                label="Legal Last Name"
                name="lastName"
                register={register}
                errors={errors}
                placeholder="Enter your legal last name" // Updated
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Primary Contact Number"
                name="contactNumber"
                register={register}
                errors={errors}
                placeholder="e.g., +1 (555) 123-4567" // Updated
              />
              <InputField
                label="National ID / Passport Number"
                name="nationalId"
                register={register}
                errors={errors}
                placeholder="Provide government issued ID number" // Updated
              />
            </div>
          </section>

          {/* 2. Financial & Loan Details */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500/50 pb-2">
              2. Financial and Loan Requirements
            </h2>

            <InputField
              label="Source of Income (Employer or Business Name)"
              name="incomeSource"
              register={register}
              errors={errors}
              placeholder="Name of your employer or primary business" // Updated
            />

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Estimated Monthly Income (Pre-tax)"
                name="monthlyIncome"
                register={register}
                errors={errors}
                type="number"
                placeholder="Enter gross monthly income (e.g., 5500.00)" // Updated
              />
              <InputField
                label="Requested Loan Amount"
                name="loanAmount"
                register={register}
                errors={errors}
                type="number"
                placeholder="Enter requested amount (e.g., 10000.00)" // Updated
              />
            </div>

            <TextAreaField
              label="Purpose of Loan (Briefly explain your need)"
              name="loanReason"
              register={register}
              errors={errors}
              placeholder="State the primary reason for seeking this loan" // Updated
            />
          </section>

          {/* 3. Residential Address */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500/50 pb-2">
              3. Residential Address & Notes
            </h2>

            <TextAreaField
              label="Current Full Residential Address"
              name="address"
              register={register}
              errors={errors}
              rows={3}
              placeholder="Include Street, City, State, and Zip/Postal Code" // Updated
            />

            <TextAreaField
              label="Additional Notes (Optional)"
              name="extraNotes"
              register={register}
              errors={errors}
              rows={2}
              required={false}
              placeholder="Provide any information relevant to processing your application (optional)" // Updated
            />
          </section>

          {/* --- Final Submission & Consent --- */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-center text-gray-600 mb-6">
              By clicking "Submit Application," you confirm that all information
              provided is accurate and grant us authorization to conduct
              necessary verification checks.
            </p>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-extrabold py-4 rounded-lg text-xl shadow-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanApply;
