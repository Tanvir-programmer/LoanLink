import React, { useState, useContext } from "react";
import { Eye, EyeOff, Info } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { saveOrUpdateUser } from "../../utils/utils";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { signInWithGoogle, signInUser, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  // ---------------- EMAIL / PASSWORD LOGIN ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signInUser(email, password);

      await saveOrUpdateUser({
        email: result.user.email,
      });

      setUser(result.user);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ---------------- GOOGLE LOGIN ----------------
  const handleGoogleRegister = async () => {
    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });

      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <label className="label font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            className="input input-bordered w-full mb-3"
            placeholder="Enter your email"
          />

          {/* Password */}
          <label className="label font-semibold text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              className="input input-bordered w-full"
              placeholder="Enter password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
            <Info size={16} />
            <p>Your credentials are securely encrypted.</p>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-5 mb-4 font-bold text-lg text-white"
          >
            Login
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center py-3 border border-gray-300 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="Google"
            className="h-5 mr-2"
          />
          Continue with Google
        </button>

        <p className="text-center mt-5 text-gray-700 text-sm">
          Don’t have an account?{" "}
          <NavLink to="/register" className="text-indigo-600 hover:underline">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
