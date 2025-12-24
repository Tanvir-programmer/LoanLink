import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast, Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { saveOrUpdateUser } from "../utils/utils";

const Registration = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile, setUser, signInWithGoogle } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");

  // ---------------- GOOGLE REGISTER ----------------
  const handleGoogleRegister = async (e) => {
    e.preventDefault();

    if (!role) {
      return toast.error("Please select a role before continuing with Google.");
    }

    try {
      const result = await signInWithGoogle();
      const user = result.user;

      await saveOrUpdateUser({
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        role,
      });

      setUser({ ...user, role });

      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        toast.error(err.message);
      }
    }
  };

  // ---------------- EMAIL REGISTER ----------------
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL =
      form.photoURL.value?.trim() ||
      "https://i.ibb.co/L8y2w03/default-user.png";

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }
    if (!/[A-Z]/.test(password)) {
      return toast.error(
        "Password must include at least one uppercase letter."
      );
    }
    if (!/[a-z]/.test(password)) {
      return toast.error(
        "Password must include at least one lowercase letter."
      );
    }
    if (!role) {
      return toast.error("Please select a role.");
    }

    try {
      const userCredential = await createUser(email, password);
      const firebaseUser = userCredential.user;

      // ✅ CORRECT Firebase profile update
      await updateUserProfile(name, photoURL);

      // ✅ Save to MongoDB
      await saveOrUpdateUser({
        name,
        email,
        image: photoURL,
        role,
      });

      // ✅ Force React state update (Navbar fix)
      setUser({
        ...firebaseUser,
        displayName: name,
        photoURL,
        role,
      });

      toast.success("Registration successful!");
      form.reset();
      setRole("");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // 🔥 UI UNCHANGED BELOW 🔥
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border-t-8 border-indigo-600">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo URL
            </label>
            <input
              type="url"
              name="photoURL"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Paste your photo URL"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a role</option>
              <option value="borrower">Borrower</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 pr-12"
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-12 -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Register
          </button>

          {/* Google Login */}
          <button
            onClick={handleGoogleRegister}
            type="button"
            className="w-full flex items-center justify-center py-3 border border-gray-300 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-sm"
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google Logo"
              className="h-5 mr-2"
            />
            Continue with Google
          </button>
        </form>

        <p className="text-center text-sm mt-5 text-gray-600">
          Already have an account?{" "}
          <Link
            className="text-indigo-600 font-medium hover:underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
};

export default Registration;
