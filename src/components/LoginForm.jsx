import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase-client";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({ email: "", password: "" });
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

    if (!formState.email || !formState.password) {
      setFormErrors({ general: "Email e password sono obbligatori." });
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: formState.email,
      password: formState.password,
    });

    if (error) {
      setFormErrors({ general: "Credenziali non valide. Riprova." }); 
    } else {
      setSuccessMessage("Login effettuato! Verrai reindirizzato...");
      setTimeout(() => {
        navigate("/");
        window.location.reload(); 
      }, 1500);
    }
    setLoading(false);
  };

  return (
    // Contenitore principale del form
    <div className="w-full max-w-md mx-auto bg-card-bg rounded-lg p-8 border border-secondary/20">
      <h2 className="text-3xl font-heading text-center text-primary mb-6">ACCEDI</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Messaggi di errore e successo */}
        {formErrors.general && (
          <p className="text-accent text-center font-body bg-accent/10 p-3 rounded-md">{formErrors.general}</p>
        )}
        {successMessage && (
          <p className="text-green-400 text-center font-body bg-green-400/10 p-3 rounded-md">{successMessage}</p>
        )}

        {/* Campo Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-heading text-secondary text-sm">EMAIL</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="iltuonome@esempio.com"
            className="px-4 py-3 rounded-md bg-dark-bg border border-secondary/30 text-primary placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
            required
          />
        </div>

        {/* Campo Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-heading text-secondary text-sm">PASSWORD</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="px-4 py-3 rounded-md bg-dark-bg border border-secondary/30 text-primary placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
            required
          />
        </div>

        {/* Pulsante Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 py-3 rounded-md font-heading text-lg text-primary bg-accent hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-wait"
        >
          {loading ? "CARICAMENTO..." : "ENTRA"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;