import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SessionContext from "../context/SessionContext";
import { supabase } from "../supabase/supabase-client";
import Searchbar from "./Searchbar";

// --- Icone SVG ---
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Rinomina la funzione se il file si chiama Sidebar.jsx
export default function Sidebar() {
  const { user, logout } = useContext(SessionContext);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const getAvatar = async () => {
      if (!user) return setAvatarUrl("");
      try {
        const { data: profileData } = await supabase.from("profiles").select("avatar_url").eq("id", user.id).single();
        if (profileData?.avatar_url) {
          const { data: storageData } = supabase.storage.from("avatars").getPublicUrl(profileData.avatar_url);
          setAvatarUrl(storageData.publicUrl);
        }
      } catch (err) {
        console.error("Errore recupero avatar:", err.message);
      }
    };
    getAvatar();
  }, [user]);
  
  const activeColor = '#dc2626'; // red-600
  const activeLinkStyle = ({ isActive }) => isActive ? { color: activeColor } : {};
  const navLinkClass = "text-lg text-gray-400 hover:text-red-500 transition-colors";
  const mobileNavLinkClass = "text-3xl text-white hover:text-red-500";

  const navLinks = [ { to: "/", text: "HOME" }, { to: "/games/action", text: "GIOCHI" } ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, transition: { duration: 0.3 } },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4 sm:gap-8">
              <Link to="/" className="text-2xl text-white hover:text-red-500 transition-colors flex-shrink-0">
                GAMES HUB
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map(link => (
                  <NavLink key={link.to} to={link.to} style={activeLinkStyle} className={navLinkClass}>
                    {link.text}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Searchbar />
              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/profile" className="flex-shrink-0">
                    <img src={avatarUrl || "https://via.placeholder.com/40"} alt="Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-gray-600/50" />
                  </Link>
                  <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors flex-shrink-0">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="text-gray-400 hover:text-white px-4 py-2 rounded-md text-sm transition-colors">
                    LOGIN
                  </Link>
                  <Link to="/register" className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors flex-shrink-0">
                    REGISTRATI
                  </Link>
                </div>
              )}
            </div>
            <div className="md:hidden z-50">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-gray-900/95 backdrop-blur-lg z-40 flex flex-col items-center justify-start pt-24 md:hidden min-h-screen"
          >
            <ul className="flex flex-col items-center text-center gap-8">
              {navLinks.map(link => (<li key={link.to}><NavLink to={link.to} style={activeLinkStyle} className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>{link.text}</NavLink></li>))}
              <li className="w-full max-w-xs pt-4"><Searchbar /></li>
              {user ? (
                <>
                  <li className="pt-4"><Link to="/profile" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Profilo</Link></li>
                  <li><button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className={`${mobileNavLinkClass} text-red-500`}>Logout</button></li>
                </>
              ) : (
                <>
                  <li className="pt-4"><Link to="/login" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Login</Link></li>
                  <li><Link to="/register" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Registrati</Link></li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}