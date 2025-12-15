import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";

const UpdateLoans = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loan, setLoan] = useState({
    title: "",
    category: "",
    interest: "",
    maxLimit: "",
    imageUrl: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/loans/${id}`);
        if (!res.ok) throw new Error("Failed to fetch loan data");
        const data = await res.json();
        setLoan({
          title: data.title || "",
          category: data.category || "",
          interest: data.interest || "",
          maxLimit: data.maxLimit || "",
          imageUrl: data.imageUrl || "",
          description: data.description || "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load loan data");
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoan((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formattedInterest = String(loan.interest).replace(/[^0-9.]/g, "");
      const formattedMaxLimit = String(loan.maxLimit).replace(/[^0-9.]/g, "");

      const body = {
        ...loan,
        interest: formattedInterest,
        maxLimit: formattedMaxLimit,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/loans/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Update failed");
      toast.success("Loan updated successfully");
      navigate("/dashboard/manage-loans");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update loan");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-gray-700">Loading loan details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          Update Loan
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={loan.title}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={loan.category}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Interest Rate
              </label>
              <input
                type="text"
                name="interest"
                value={loan.interest}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Maximum Limit
              </label>
              <input
                type="text"
                name="maxLimit"
                value={loan.maxLimit}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              value={loan.imageUrl}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={loan.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full border rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition ${
              submitting ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {submitting ? "Updating..." : "Update Loan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateLoans;
