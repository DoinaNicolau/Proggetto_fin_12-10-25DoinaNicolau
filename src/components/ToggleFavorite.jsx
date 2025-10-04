import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext";
import { useSession } from "../context/useSession";
import { motion } from "framer-motion"; 

// Icona Cuore (SVG)
const HeartIcon = ({ isFavorite }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    
    className={`w-8 h-8 transition-colors duration-300
      ${isFavorite ? 'text-accent' : 'text-secondary/50 hover:text-accent/70'}`
    }
  >
    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-1.344-.688C8.8 18.95 5.53 16.639 3.255 13.998a11.953 11.953 0 0 1-1.344-3.153c-.345-1.423-.345-2.846 0-4.27A7.5 7.5 0 0 1 12 4.095a7.5 7.5 0 0 1 10.09 2.474c.345 1.424.345 2.847 0 4.27-.384 1.583-1.63 3.424-3.328 5.165a15.247 15.247 0 0 1-1.344.688l-.022.012-.007.003-.002.001-.002.001-.006-.003c-.002 0-.004 0-.006-.002a1.001 1.001 0 0 1-.465.127 1.001 1.001 0 0 1-.465-.127" />
  </svg>
);


export default function ToggleFavorite({ game }) {
  const { favorites, addFavorite, removeFavorite, loading } = useContext(FavoritesContext);
  const { user } = useSession();

  const isFavorite = favorites.some(fav => fav.game_id === game.id);

  const handleToggle = async (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 

    if (!user) {
      alert("Effettua il login per aggiungere ai favoriti");
      return;
    }
    if (loading) return;

    if (isFavorite) {
      await removeFavorite(game.id);
    } else {
      await addFavorite(game);
    }
  };

  return (

    <motion.button
      whileTap={{ scale: 1.3 }} 
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      onClick={handleToggle}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 rounded-full font-heading text-sm bg-card-bg/80 border border-secondary/20 backdrop-blur-sm group disabled:opacity-50"
      aria-label={isFavorite ? "Rimuovi dai favoriti" : "Aggiungi ai favoriti"}
    >
      <HeartIcon isFavorite={isFavorite} />
      <span className={`
        ${isFavorite ? 'text-primary' : 'text-secondary group-hover:text-primary'}
        transition-colors duration-300`
      }>
        {isFavorite ? "PREFERITO" : "AGGIUNGI"}
      </span>
    </motion.button>
  );
}