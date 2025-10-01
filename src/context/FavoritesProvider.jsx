import { useState, useCallback, useEffect } from "react";
import FavoritesContext from "./FavoritesContext";
import { supabase } from "../supabase/supabase-client";
import { useSession } from "../context/useSession";

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const { user } = useSession();

  // Fetch dei preferiti dal DB
  const getFavorites = useCallback(async () => {
    if (!user) return;
    const { data: favourites, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching favorites:", error);
    } else {
      setFavorites(favourites);
    }
  }, [user]);

  // Aggiungi un preferito
  const addFavorite = async (game) => {
    if (!user) return;

    // Aggiorna subito lo stato locale
    setFavorites((prev) => [
      ...prev,
      {
        user_id: user.id,
        game_id: game.id,
        game_name: game.name,
        game_image: game.background_image,
      },
    ]);

    // Inserisci nel DB
    const { error } = await supabase
      .from("favorites")
      .insert([
        {
          user_id: user.id,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        },
      ]);

    if (error) {
      console.error("Error adding favorite:", error);
      // Se c'è errore, rimuovi dal locale
      setFavorites((prev) => prev.filter((f) => f.game_id !== game.id));
    }
  };

  // Rimuovi un preferito
  const removeFavorite = async (gameId) => {
    if (!user) return;

    // Aggiorna subito lo stato locale
    setFavorites((prev) => prev.filter((f) => f.game_id !== gameId));

    // Rimuovi dal DB
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("game_id", gameId);

    if (error) {
      console.error("Error removing favorite:", error);
      // Se c'è errore, ricarica i preferiti
      getFavorites();
    }
  };

  // Effetto per fetch iniziale e subscription real-time
  useEffect(() => {
    if (user) getFavorites();

    const favoritesSubscription = supabase
      .channel("favorites")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "favorites" },
        () => getFavorites()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(favoritesSubscription);
      favoritesSubscription.unsubscribe();
    };
  }, [getFavorites, user]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, getFavorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
