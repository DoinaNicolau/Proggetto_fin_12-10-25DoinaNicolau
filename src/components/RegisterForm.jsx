import { useState } from "react";
import { supabase } from "../supabase/supabase-client";
import { FormSchema, getErrors } from "../lib/validationForm"; // Assumo che usi Zod qui
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

  // Stili riutilizzabili per gli input
  const inputStyles = "px-4 py-3 rounded-md bg-dark-bg border border-secondary/30 text-primary placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all";
  const labelStyles = "font-heading text-secondary text-sm";
  const errorStyles = "text-accent text-xs mt-1";

  return (
    <div className="w-full max-w-md mx-auto bg-card-bg rounded-lg p-8 border border-secondary/20">
      <h2 className="text-3xl font-heading text-center text-primary mb-6">CREA UN ACCOUNT</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Messaggi di successo/errore generale */}
        {successMessage && (
          <p className="text-green-400 text-center font-body bg-green-400/10 p-3 rounded-md mb-2">{successMessage}</p>
        )}
        {formErrors.general && (
          <p className="text-accent text-center font-body bg-accent/10 p-3 rounded-md mb-2">{formErrors.general}</p>
        )}
        
        {/* Griglia per Nome e Cognome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className={labelStyles}>NOME</label>
            <input id="firstName" type="text" name="firstName" value={formState.firstName} onChange={handleChange} className={inputStyles} />
            {formErrors.firstName && <p className={errorStyles}>{formErrors.firstName}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className={labelStyles}>COGNOME</label>
            <input id="lastName" type="text" name="lastName" value={formState.lastName} onChange={handleChange} className={inputStyles} />
            {formErrors.lastName && <p className={errorStyles}>{formErrors.lastName}</p>}
          </div>
        </div>
        
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className={labelStyles}>EMAIL</label>
          <input id="email" type="email" name="email" value={formState.email} onChange={handleChange} className={inputStyles} />
          {formErrors.email && <p className={errorStyles}>{formErrors.email}</p>}
        </div>
        
        {/* Username */}
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className={labelStyles}>USERNAME</label>
          <input id="username" type="text" name="username" value={formState.username} onChange={handleChange} className={inputStyles} />
          {formErrors.username && <p className={errorStyles}>{formErrors.username}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className={labelStyles}>PASSWORD</label>
          <input id="password" type="password" name="password" value={formState.password} onChange={handleChange} className={inputStyles} />
          {formErrors.password && <p className={errorStyles}>{formErrors.password}</p>}
        </div>
        
        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 py-3 rounded-md font-heading text-lg text-primary bg-accent hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-wait"
        >
          {loading ? "REGISTRAZIONE..." : "REGISTRATI"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;