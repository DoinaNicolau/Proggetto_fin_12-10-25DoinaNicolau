import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"; 
import { supabase } from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import Avatar from "../../components/Avatar";
import FavoritesContext from "../../context/FavoritesContext";

export default function ProfilePage() {   
  const { user } = useContext(SessionContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); 
  const [errorMsg, setErrorMsg] = useState(""); 
  const { favorites, removeFavorite } = useContext(FavoritesContext);

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

  // Funzione helper per creare uno slug dal nome del gioco
  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
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
    <div className="max-w-3xl mx-auto mt-12 p-4">
      {/* Box profilo */}
      <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 mb-12">
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
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />

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

      {/* Box preferiti */}
      <div className="w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">I miei preferiti</h2>

        {favorites.length === 0 ? (
          <p className="text-gray-600">Non hai ancora aggiunto giochi ai preferiti.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favorites.map((fav) => {
              const slug = fav.game_slug || generateSlug(fav.game_name);
              return (
                <li
                  key={fav.game_id}
                  className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl shadow hover:bg-gray-200 transition"
                >
                  <Link
                    to={`/games/${slug}/${fav.game_id}`}
                    className="flex items-center flex-1 gap-4"
                  >
                    <img
                      src={fav.game_image}
                      alt={fav.game_name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{fav.game_name}</p>
                    </div>
                  </Link>

                  <button
                    onClick={() => removeFavorite(fav.game_id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                  >
                    Rimuovi
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
