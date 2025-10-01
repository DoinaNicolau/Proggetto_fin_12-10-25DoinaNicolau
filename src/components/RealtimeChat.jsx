import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase-client";

export default function RealtimeChat({ game }) {
  const [messages, setMessages] = useState([]);

  const getInitialMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("game_id", game.id)
      .order("updated_at", { ascending: true });

    if (error) console.error("Errore caricamento messaggi:", error);
    else setMessages(data);
  };

  useEffect(() => {
    getInitialMessages();

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => getInitialMessages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [game.id]);

  return (
    <div className="flex flex-col gap-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-yellow-100 px-3 py-2 rounded-lg shadow-sm"
        >
          <span className="font-semibold">{msg.profile_username}:</span>{" "}
          <span>{msg.content}</span>
        </div>
      ))}
    </div>
  );
}
