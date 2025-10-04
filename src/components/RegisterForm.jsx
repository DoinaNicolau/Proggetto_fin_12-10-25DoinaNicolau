import { useState } from "react";
import { supabase } from "../supabase/supabase-client";
import { FormSchema, getErrors } from "../lib/validationForm"; 
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors({});
    setSuccessMessage("");

    const validation = FormSchema.safeParse(formState);
    if (!validation.success) {
      setFormErrors(getErrors(validation.error));
      setLoading(false);
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
      if (error.message.includes("User already registered")) {
        setFormErrors({ email: "Questa email è già stata utilizzata." });
      } else {
        setFormErrors({ general: "Si è verificato un errore. Riprova." });
      }
    } else {
      setSuccessMessage("Registrazione completata! Controlla la tua email per confermare l'account.");
    }
    setLoading(false);
  };

  // Stili coerenti con tema scuro
  const inputStyles = "px-4 py-3 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all";
  const labelStyles = "font-heading text-gray-400 text-sm";
  const errorStyles = "text-red-400 text-xs mt-1";

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 rounded-lg p-8 border border-gray-700 shadow-lg">
      <h2 className="text-3xl font-heading text-center text-white mb-6">CREA UN ACCOUNT</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {successMessage && (
          <p className="text-green-400 text-center font-body bg-green-400/20 p-3 rounded-md">{successMessage}</p>
        )}
        {formErrors.general && (
          <p className="text-red-400 text-center font-body bg-red-400/20 p-3 rounded-md">{formErrors.general}</p>
        )}

        {/* Nome e Cognome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className={labelStyles}>NOME</label>
            <input id="firstName" name="firstName" type="text" value={formState.firstName} onChange={handleChange} className={inputStyles} />
            {formErrors.firstName && <p className={errorStyles}>{formErrors.firstName}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className={labelStyles}>COGNOME</label>
            <input id="lastName" name="lastName" type="text" value={formState.lastName} onChange={handleChange} className={inputStyles} />
            {formErrors.lastName && <p className={errorStyles}>{formErrors.lastName}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelStyles}>EMAIL</label>
          <input id="email" name="email" type="email" value={formState.email} onChange={handleChange} placeholder="iltuonome@esempio.com" className={inputStyles} />
          {formErrors.email && <p className={errorStyles}>{formErrors.email}</p>}
        </div>

        {/* Username */}
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className={labelStyles}>USERNAME</label>
          <input id="username" name="username" type="text" value={formState.username} onChange={handleChange} className={inputStyles} />
          {formErrors.username && <p className={errorStyles}>{formErrors.username}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className={labelStyles}>PASSWORD</label>
          <input id="password" name="password" type="password" value={formState.password} onChange={handleChange} placeholder="••••••••" className={inputStyles} />
          {formErrors.password && <p className={errorStyles}>{formErrors.password}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 py-3 rounded-md font-heading text-lg text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-wait"
        >
          {loading ? "REGISTRAZIONE..." : "REGISTRATI"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
