import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import GenresDropdown from "./GenresDropdown";
import SessionContext from "../context/SessionContext";
import { supabase } from "../supabase/supabase-client";

export default function Sidebar({ onGenreSelect }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(SessionContext);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const getAvatar = async () => {
      if (!user) {
        setAvatarUrl(""); 
        return;
      }

      try {
        
        const { data, error } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (data?.avatar_url) {
       
          const { data: publicData, error: urlError } = supabase
            .storage
            .from("avatars") 
            .getPublicUrl(data.avatar_url);
        

          if (urlError) throw urlError;

          setAvatarUrl(publicData.publicUrl);
        } else {
          setAvatarUrl(""); 
        }
      } catch (err) {
        console.error("Errore recupero avatar:", err.message);
        setAvatarUrl("");
      }
    };

    getAvatar();
  }, [user]);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded bg-[#E6D5B8]/70 backdrop-blur-md border border-white/30 text-black shadow-md hover:bg-[#E6D5B8]/90 transition"
        onClick={() => setOpen(!open)}
        aria-label="Apri/chiudi menu"
      >
        {open ? "×" : "☰"}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-64 p-4 pt-16 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40
        bg-[#E6D5B8]/70 backdrop-blur-md border border-white/30 shadow-lg text-black`}
        aria-label="Sidebar di navigazione"
      >
        <header className="flex flex-col items-center mb-6">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar utente"
              className="w-16 h-16 rounded-full mb-2 object-cover border-2 border-white"
            />
          ) : (
            <div className="w-16 h-16 rounded-full mb-2 bg-gray-300 flex items-center justify-center text-white">
              ?
            </div>
          )}
          <h2 className="text-xl font-bold">Menu</h2>
          {user && (
            <p className="mt-1 text-sm font-medium text-gray-700 text-center">
              {user.email}
            </p>
          )}
        </header>

        <nav>
          <ul className="space-y-4 mb-6">
            <li>
              <Link to="/" className="hover:text-yellow-700" onClick={() => setOpen(false)}>
                Homepage
              </Link>
            </li>

            {!user && (
              <>
                <li>
                  <Link to="/login" className="hover:text-yellow-700" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-yellow-700" onClick={() => setOpen(false)}>
                    Register
                  </Link>
                </li>
              </>
            )}

            {user && (
              <>
                <li>
                  <Link to="/profile" className="hover:text-yellow-700" onClick={() => setOpen(false)}>
                    Profilo
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="hover:text-red-600 font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            <li>
              <a href="#" className="hover:text-yellow-700">
                Impostazioni
              </a>
            </li>
          </ul>

          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Filtra per genere</h3>
            <GenresDropdown onSelect={onGenreSelect} />
          </div>
        </nav>
      </aside>
    </>
  );
}
