import React from "react";

const Login = () => {
  return (
    <div className=" my-5">
      <fieldset className=" mx-auto fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-2xl text-center">Login</legend>

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />
        <div className="text-center mt-2 ">
          <button
            type="button"
            className="text-sm text-indigo-600 hover:underline "
          >
            Forgot Password?
          </button> 
        </div>
        <button className="btn btn-primary my-3">Login</button>
        <button
          type="button"
          //   onClick={}
          className="w-full flex items-center justify-center py-3 border border-gray-300 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 shadow-sm"
        >
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google logo"
            className="h-5 mr-2"
          />
          Continue with Google
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
