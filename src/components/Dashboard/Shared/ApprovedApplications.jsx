import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaFileDownload } from "react-icons/fa";

const ApprovedApplications = () => {
  const [approvedLoans, setApprovedLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedLoans();
  }, []);

  const fetchApprovedLoans = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/loan-applications`);
      const approved = res.data.filter((loan) => loan.status === "Approved");
      setApprovedLoans(approved);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch approved applications");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Approved Applications</h2>
          <p className="text-gray-500">History of all verified and approved microloans.</p>
        </div>
        <div className="badge badge-success gap-2 p-4 text-white font-medium">
          Total Approved: {approvedLoans.length}
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-100 rounded-xl">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-600">
              <th className="py-4">Loan ID</th>
              <th>User Info</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Approved Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvedLoans.length > 0 ? (
              approvedLoans.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                  <td className="font-mono text-xs text-indigo-600">
                    #{app._id.slice(-8).toUpperCase()}
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-700">
                        {app.firstName} {app.lastName}
                      </span>
                      <span className="text-xs text-gray-400">{app.userEmail}</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="text-green-600 font-bold">
                      ${app.loanAmount?.toLocaleString()}
                    </span>
                  </td>
                  <td className="text-center text-gray-500">
                    {app.approvedAt 
                      ? new Date(app.approvedAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })
                      : "Recently Approved"}
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        className="btn btn-sm btn-ghost text-blue-500 hover:bg-blue-50"
                        title="View Full Details"
                      >
                        <FaEye size={16} />
                      </button>
                      <button 
                        className="btn btn-sm btn-ghost text-gray-500 hover:bg-gray-100"
                        title="Download Receipt"
                      >
                        <FaFileDownload size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-20 text-gray-400">
                  <div className="flex flex-col items-center">
                    <p className="text-lg">No approved loans yet.</p>
                    <p className="text-sm">Once you approve a pending application, it will appear here.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedApplications;