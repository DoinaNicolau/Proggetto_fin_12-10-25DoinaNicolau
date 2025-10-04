// src/components/LoginForm.jsx (Aggiornato per Tema Scuro)

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
      // 1. MESSAGGIO D'ERRORE PIÙ ESPLICITO
      let errorMessage = "Credenziali non valide. Riprova.";
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Email o password non corretti. Verifica le credenziali.";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Email non confermata. Controlla la tua casella di posta.";
      }
      setFormErrors({ general: errorMessage }); 
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
    // Contenitore principale del form: Sfondo scuro per adattarsi al tema
    <div className="w-full max-w-md mx-auto bg-gray-900 rounded-lg p-8 border border-gray-700 shadow-lg">
      {/* Testo h2: Bianco per il tema scuro */}
      <h2 className="text-3xl font-heading text-center text-white mb-6">ACCEDI</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Messaggi di errore e successo (usando colori tema scuro) */}
        {formErrors.general && (
          <p className="text-red-400 text-center font-body bg-red-400/20 p-3 rounded-md">{formErrors.general}</p>
        )}
        {successMessage && (
          <p className="text-green-400 text-center font-body bg-green-400/20 p-3 rounded-md">{successMessage}</p>
        )}

        {/* Campo Email */}
        <div className="flex flex-col gap-2">
          {/* Label: Grigio chiaro per tema scuro */}
          <label htmlFor="email" className="font-heading text-gray-400 text-sm">EMAIL</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="iltuonome@esempio.com"
            // Input style: Sfondo grigio scuro, testo bianco, bordo grigio
            className="px-4 py-3 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all"
            required
          />
        </div>

        {/* Campo Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-heading text-gray-400 text-sm">PASSWORD</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="px-4 py-3 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all"
            required
          />
        </div>

        {/* Pulsante Submit */}
        <button
          type="submit"
          disabled={loading}
          // Button style: Rosso (accent), testo bianco
          className="mt-4 py-3 rounded-md font-heading text-lg text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-wait"
        >
          {loading ? "CARICAMENTO..." : "ENTRA"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;