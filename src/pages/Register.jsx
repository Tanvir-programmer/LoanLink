import React, { useState } from "react";

const Register = () => {
  const [role, setRole] = useState("");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="my-5">
      <fieldset className="mx-auto fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-2xl text-center">
          Register
        </legend>

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        <label className="label">PhotoURL</label>
        <input type="text" className="input" placeholder="PhotoURL" />

        <label htmlFor="role" className="label font-semibold">
          Role
        </label>
        <select
          id="role"
          value={role}
          onChange={handleRoleChange}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select a role
          </option>
          <option value="borrower">Borrower</option>
          <option value="manager">Manager</option>
        </select>

        <button className="btn btn-primary my-3 w-full">Register</button>

        <button
          type="button"
          className="w-full flex items-center justify-center py-3 border border-gray-300 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 shadow-sm"
        >
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google logo"
            className="h-5 mr-2"
          />
          Continue with Google
        </button>

        {role && (
          <p className="text-sm text-gray-600 mt-2">
            Selected Role: <span className="font-semibold">{role}</span>
          </p>
        )}
      </fieldset>
    </div>
  );
};

export default Register;
