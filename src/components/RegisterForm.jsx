import { useState } from "react";
import { supabase } from "../supabase/supabase-client";
import { FormSchema, getErrors } from "../lib/validationForm";
import { useNavigate } from "react-router-dom";

  const RegisterForm = () => {
    
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = FormSchema.safeParse(formState);
    if (!validation.success) {
      setFormErrors(getErrors(validation.error));
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: formState.email,
      password: formState.password,
      options: {
        data: {
          first_name: formState.firstName,
          last_name: formState.lastName,
          username: formState.username,
        },
      },
    });

    if (error) {
      setErrorMessage(error.message); // messaggio inline
      setSuccessMessage("");
    } else {
      setSuccessMessage("Registrazione completata! ✅"); // messaggio inline
      setErrorMessage("");

      // Reindirizza dopo 1.5 secondi per dare tempo di leggere il messaggio
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };


  return (
        <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 p-6 rounded-xl shadow-lg bg-white/60 backdrop-blur-sm"
    >
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
        {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
      </div>

      {/* First Name */}
      <div className="flex flex-col">
        <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formState.firstName}
          onChange={handleChange}
          placeholder="Inserisci il tuo nome"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
      </div>

      {/* Last Name */}
      <div className="flex flex-col">
        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={formState.lastName}
          onChange={handleChange}
          placeholder="Inserisci il tuo cognome"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
      </div>

      {/* Username */}
      <div className="flex flex-col">
        <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          value={formState.username}
          onChange={handleChange}
          placeholder="Scegli un username"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        {formErrors.username && <p className="text-red-500 text-xs mt-1">{formErrors.username}</p>}
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
          placeholder="Inserisci una password sicura"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-yellow-400 to-[#F5E8C7] hover:from-yellow-500 hover:to-[#F5E8C7]/90 transition"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
