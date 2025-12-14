import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Search, Edit3, Trash2, Plus, ExternalLink, Inbox } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageLoans = () => {
  const [loans, setLoans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/loans`);
      const data = await res.json();
      setLoans(data);
    } catch {
      toast.error("Failed to load loan products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Loan?",
      text: "This loan product will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/loans/${id}`,
            { method: "DELETE" }
          );
          if (res.ok) {
            setLoans(loans.filter((loan) => loan._id !== id));
            toast.success("Loan deleted successfully");
          }
        } catch {
          toast.error("Delete failed");
        }
      }
    });
  };

  const filteredLoans = loans.filter(
    (loan) =>
      loan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Manage Loans
            </h1>
            <p className="text-slate-500 mt-1">
              View, edit, or remove loan products
            </p>
          </div>
          <Link
            to="/dashboard/add-loan"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow"
          >
            <Plus size={18} />
            Add New Loan
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by title or category"
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-slate-100 text-slate-600 text-xs uppercase font-semibold">
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th className="text-center">Interest</th>
                  <th>Category</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredLoans.length > 0 ? (
                  filteredLoans.map((loan) => (
                    <tr key={loan._id} className="hover:bg-slate-50">
                      <td>
                        <img
                          src={loan.image}
                          alt={loan.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </td>

                      <td>
                        <div className="font-semibold text-slate-900">
                          {loan.title}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          ID: {loan._id.slice(-6)}
                          <ExternalLink size={12} />
                        </div>
                      </td>

                      <td className="text-center font-bold text-indigo-600">
                        {loan.interestRate}%
                      </td>

                      <td>
                        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
                          {loan.category}
                        </span>
                      </td>

                      <td className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/dashboard/update-loan/${loan._id}`}
                            className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600"
                          >
                            <Edit3 size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(loan._id)}
                            className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-16 text-center">
                      <div className="flex flex-col items-center gap-4 text-slate-400">
                        <Inbox size={40} />
                        <p>No loan products found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-xs text-slate-500 uppercase font-semibold">
              Total Loans
            </p>
            <p className="text-2xl font-extrabold text-slate-900">
              {loans.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-xs text-slate-500 uppercase font-semibold">
              Average Interest
            </p>
            <p className="text-2xl font-extrabold text-indigo-600">
              {(
                loans.reduce((a, b) => a + b.interestRate, 0) /
                (loans.length || 1)
              ).toFixed(1)}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageLoans;
