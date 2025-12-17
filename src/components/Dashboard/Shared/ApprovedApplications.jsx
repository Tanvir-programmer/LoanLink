import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaFileDownload, FaTimes } from "react-icons/fa";

const ApprovedApplications = () => {
  const [approvedLoans, setApprovedLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    fetchApprovedLoans();
  }, []);

  const fetchApprovedLoans = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/loan-applications`
      );
      const approved = res.data.filter((loan) => loan.status === "Approved");
      setApprovedLoans(approved);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --- DOWNLOAD FUNCTION ---
  const handleDownload = (loan) => {
    const receiptContent = `
=========================================
        LOANLINK OFFICIAL RECEIPT
=========================================
Loan ID: #${loan._id.toUpperCase()}
Borrower: ${loan.firstName} ${loan.lastName}
Email: ${loan.userEmail}
-----------------------------------------
Loan Category: ${loan.category}
Approved Amount: $${loan.loanAmount?.toLocaleString()}
Apply Date: ${new Date(loan.application_date).toLocaleDateString()}
Approval Date: ${new Date(loan.approvedAt).toLocaleDateString()}
Status: APPROVED
-----------------------------------------
Generated on: ${new Date().toLocaleString()}
=========================================
    `;

    const element = document.createElement("a");
    const file = new Blob([receiptContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Receipt_${loan.firstName}_${loan._id.slice(-6)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Receipt downloaded successfully!");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-sm min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Approved Applications
          </h2>
          <p className="text-gray-500 text-sm">
            Verified history of processed loans.
          </p>
        </div>
        <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-bold border border-green-200">
          Total: {approvedLoans.length}
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="table w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
              <th className="py-4 px-6 text-left">Loan ID</th>
              <th className="text-left">Borrower</th>
              <th className="text-center">Final Amount</th>
              <th className="text-center">Approval Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvedLoans.map((app) => (
              <tr
                key={app._id}
                className="bg-white border border-gray-100 hover:shadow-sm transition-all"
              >
                <td className="px-6 py-4 font-mono text-xs text-green-600 font-bold">
                  #{app._id.slice(-8).toUpperCase()}
                </td>
                <td>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700">
                      {app.firstName} {app.lastName}
                    </span>
                    <span className="text-xs text-gray-400">
                      {app.userEmail}
                    </span>
                  </div>
                </td>
                <td className="text-center font-bold text-green-600">
                  ${app.loanAmount?.toLocaleString()}
                </td>
                <td className="text-center text-gray-500 text-sm">
                  {app.approvedAt
                    ? new Date(app.approvedAt).toLocaleDateString("en-GB")
                    : "Recently"}
                </td>
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setSelectedLoan(app)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    {/* --- DOWNLOAD BUTTON --- */}
                    <button
                      onClick={() => handleDownload(app)}
                      className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg"
                      title="Download Receipt"
                    >
                      <FaFileDownload />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- DETAILS MODAL --- */}
      {selectedLoan && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl bg-white relative">
            <button
              onClick={() => setSelectedLoan(null)}
              className="btn btn-sm btn-circle absolute right-4 top-4"
            >
              ✕
            </button>

            <h3 className="font-bold text-xl text-gray-800 border-b pb-4 mb-4">
              Loan Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">
                  Borrower
                </p>
                <p className="text-gray-800 font-medium">
                  {selectedLoan.firstName} {selectedLoan.lastName}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">
                  Email
                </p>
                <p className="text-gray-800 font-medium">
                  {selectedLoan.userEmail}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">
                  Category
                </p>
                <p className="badge badge-outline text-indigo-600">
                  {selectedLoan.category}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">
                  Approved Amount
                </p>
                <p className="text-green-600 font-bold text-lg">
                  ${selectedLoan.loanAmount?.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="modal-action">
              <button
                onClick={() => handleDownload(selectedLoan)}
                className="btn btn-primary gap-2"
              >
                <FaFileDownload /> Download Receipt
              </button>
              <button
                onClick={() => setSelectedLoan(null)}
                className="btn btn-ghost"
              >
                Close
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setSelectedLoan(null)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ApprovedApplications;
