import { useState, useEffect, useContext } from "react";
import { supabase } from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import Avatar from "../../components/Avatar";

export default function ProfilePage() {   
  const { user } = useContext(SessionContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); 
  const [errorMsg, setErrorMsg] = useState("");     

  useEffect(() => {
    if (user) getProfile();
  }, [user]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      if (data) {
        setUsername(data.username || "");
        setAvatarUrl(data.avatar_url || "");
      }
    } catch (error) {
      console.error("Errore caricamento profilo:", error.message);
      setErrorMsg("Errore caricamento profilo");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      setSuccessMsg(""); 
      setErrorMsg("");

      const updates = {
        id: user.id,
        username,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;

      setSuccessMsg("Profilo aggiornato con successo!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (filePath) => {
    try {
      setLoading(true);
      setAvatarUrl(filePath);

      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          avatar_url: filePath,
          updated_at: new Date(),
        });
      if (error) throw error;

      setSuccessMsg("Avatar aggiornato con successo!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (error) {
      console.error("Errore aggiornamento avatar:", error.message);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg text-gray-700">
          Devi effettuare l’accesso per vedere il tuo profilo.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
        Il mio account
      </h1>

      {successMsg && (
        <div className="mb-4 p-3 text-green-800 bg-green-100 rounded-md text-center">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="mb-4 p-3 text-red-800 bg-red-100 rounded-md text-center">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col items-center gap-6">
        <Avatar
          url={avatarUrl}
          size={160}
          onUpload={handleAvatarUpload}
        />

        <input
          type="text"
          id="username"           // ID unico
          name="username"         // Nome per i dati del form
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />

<label htmlFor="username">Username</label> 

        <button
          onClick={updateProfile}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold shadow-md transition ${
            loading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Salvataggio..." : "Aggiorna profilo"}
        </button>
      </div>
    </div>
  );
}
