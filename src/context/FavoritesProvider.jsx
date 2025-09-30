import { useState, useCallback, useEffect } from "react";
import FavoritesContext from "./FavoritesContext";
import { supabase } from "../supabase/supabase-client";
import { useSession } from "../context/useSession";

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const { user } = useSession(); // <-- qui usiamo user invece di session

  const getFavorites = useCallback(async () => {
    if (!user) return;
    const { data: favourites, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", user.id);
    if (error) console.log(error);
    else setFavorites(favourites);
  }, [user]);

  const addFavorite = async (game) => {
    if (!user) return;
    await supabase
      .from("favorites")
      .insert([
        {
          user_id: user.id,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        },
      ])
      .select();
  };

  const removeFavorite = async (gameId) => {
    if (!user) return;
    await supabase
      .from("favorites")
      .delete()
      .eq("game_id", gameId)
      .eq("user_id", user.id);
  };

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
