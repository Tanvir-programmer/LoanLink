import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { ArrowRight, Zap } from "lucide-react";

const AddLoanForManagers = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState({
    title: "Loan Title",
    category: "Category",
    interestRate: 0,
    maxLimit: 0,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreview((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLoan = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    // {
    //   "_id": {
    //     "$oid": "693907375d24eb988914167f"
    //   },
    //   "id": 6,
    //   "title": "Working Capital Advance",
    //   "category": "Short Term Debt",
    //   "interest": "11.0%",
    //   "maxLimit": "$5,000",
    //   "description": "Quick access to funds to cover immediate operational needs or cash flow gaps. Ideal for small, unexpected business costs.",
    //   "emiPlans": [
    //     {
    //       "duration": "3 Months",
    //       "rate": "11.0%"
    //     },
    //     {
    //       "duration": "6 Months",
    //       "rate": "11.5%"
    //     }
    //   ],
    //   "imageUrl": "https://i.ibb.co/TBKkfFq9/images-3.jpg"
    // }
    const loanData = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      interestRate: parseFloat(form.interestRate.value),
      maxLimit: parseFloat(form.maxLimit.value),
      documents: form.documents.value,
      emiPlans: form.emiPlans.value,
      imageUrl: form.image.value,
      createdAt: new Date().toISOString(),
      showOnHome: form.showOnHome.checked,
      status: "active",
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/loans`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loanData),
      });

      if (response.ok) {
        toast.success("Loan product successfully published");
        navigate("/allloans");
      }
    } catch {
      toast.error("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex flex-col lg:flex-row">
        {/* LEFT PREVIEW */}
        <div className="lg:w-2/5 p-10 bg-white border-r">
          <span className="text-xs font-semibold text-indigo-600 uppercase">
            Live Preview
          </span>
          <h2 className="text-2xl font-bold mt-2">Loan Card Preview</h2>
          <p className="text-sm text-slate-500 mb-8">
            Real-time visualization for borrowers
          </p>

          <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={preview.image}
              alt="preview"
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <span className="inline-block text-xs font-semibold text-indigo-600 mb-2">
                {preview.category}
              </span>
              <h3 className="text-lg font-bold truncate">{preview.title}</h3>

              <div className="flex justify-between mt-6">
                <div>
                  <p className="text-xs text-slate-500">Interest Rate</p>
                  <p className="text-xl font-bold text-indigo-600">
                    {preview.interestRate}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Max Limit</p>
                  <p className="text-lg font-semibold">${preview.maxLimit}</p>
                </div>
              </div>

              <button
                disabled
                className="w-full mt-6 py-3 text-sm font-semibold bg-slate-100 rounded-lg text-slate-400"
              >
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="lg:w-3/5 p-10">
          <header className="mb-10">
            <h1 className="text-3xl font-extrabold flex items-center gap-3">
              <Zap className="text-indigo-600" />
              Launch New Loan Product
            </h1>
            <p className="text-slate-500 mt-2">
              Create and publish loan offerings for customers
            </p>
          </header>

          <form onSubmit={handleAddLoan} className="space-y-10 max-w-2xl">
            {/* Identity */}
            <section>
              <h3 className="font-semibold mb-4">Product Identity</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  name="title"
                  onChange={handleInputChange}
                  placeholder="Loan Title"
                  className="input input-bordered w-full"
                  required
                />
                <select
                  name="category"
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="Personal">Personal</option>
                  <option value="Business">SME / Business</option>
                  <option value="Agri">Agriculture</option>
                  <option value="Edu">Education</option>
                </select>
              </div>
            </section>

            {/* Mechanics */}
            <section>
              <h3 className="font-semibold mb-4">Loan Mechanics</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <input
                  name="interestRate"
                  onChange={handleInputChange}
                  type="number"
                  step="0.01"
                  placeholder="Interest %"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="maxLimit"
                  onChange={handleInputChange}
                  type="number"
                  placeholder="Max Amount"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="emiPlans"
                  placeholder="EMI Plans (6,12)"
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </section>

            {/* Assets */}
            <section>
              <h3 className="font-semibold mb-4">Assets & Documents</h3>
              <div className="space-y-4">
                <input
                  name="image"
                  onChange={handleInputChange}
                  type="url"
                  placeholder="Image URL"
                  className="input input-bordered w-full"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Loan description"
                  className="textarea textarea-bordered w-full h-28"
                  required
                />
                <textarea
                  name="documents"
                  placeholder="Required documents"
                  className="textarea textarea-bordered w-full h-24"
                  required
                />
              </div>
            </section>

            {/* Submit */}
            <div className="flex justify-between items-center pt-6 border-t">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="showOnHome"
                  className="checkbox checkbox-primary"
                />
                Feature on homepage
              </label>

              <button disabled={loading} className="btn btn-primary px-10">
                {loading ? "Publishing..." : "Add Loan"}
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLoanForManagers;
