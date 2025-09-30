import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext";
import { useSession } from "../context/useSession";

export default function ToggleFavorite({ game }) {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const { user } = useSession();

  const isFavorite = favorites.some(fav => fav.game_id === game.id);

  const handleToggle = async () => {
    if (!user) {
      alert("Effettua il login per aggiungere ai favoriti");
      return;
    }
    if (isFavorite) {
      await removeFavorite(game.id);
    } else {
      await addFavorite(game);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-4 py-2 rounded-lg font-semibold ${
        isFavorite ? "bg-red-400" : "bg-green-400"
      }`}
    >
      {isFavorite ? "Rimuovi dai favoriti" : "Aggiungi ai favoriti"}
    </button>
  );
}
