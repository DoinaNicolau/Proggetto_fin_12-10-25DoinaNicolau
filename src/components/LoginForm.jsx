import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase-client";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.email || !formState.password) {
      setFormErrors({ general: "Email and password are required" });
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formState.email,
      password: formState.password,
    });

    if (error) {
      setFormErrors({ general: error.message });
      setSuccessMessage("");
    } else {
      setSuccessMessage("Login effettuato con successo! ✅");
      setFormErrors({});

      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 p-6 rounded-xl shadow-lg bg-white/60 backdrop-blur-sm max-w-md mx-auto"
    >
      {/* Messaggi */}
      {formErrors.general && (
        <p className="text-red-600 text-center font-semibold">{formErrors.general}</p>
      )}
      {successMessage && (
        <p className="text-green-600 text-center font-semibold">{successMessage}</p>
      )}

      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Inserisci la tua email"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="Inserisci la tua password"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-yellow-400 to-[#F5E8C7] hover:from-yellow-500 hover:to-[#F5E8C7]/90 transition"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
