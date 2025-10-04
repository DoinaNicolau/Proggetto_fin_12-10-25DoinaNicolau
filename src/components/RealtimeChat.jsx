import { useEffect, useState, useRef } from "react";
import { supabase } from "../supabase/supabase-client";
import { useSession } from "../context/useSession";

export default function RealtimeChat({ game }) {
  const { user } = useSession();
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const getInitialMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("game_id", game.id)
        .order("updated_at", { ascending: true }); 

      if (error) {
        console.error("Errore caricamento messaggi:", error);
      } else {
        setMessages(data || []);
      }
    };
    
    getInitialMessages();

    const channel = supabase
      .channel(`chat_${game.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `game_id=eq.${game.id}`,
        },
        (payload) => {
          setMessages((currentMessages) => [...currentMessages, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [game.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-secondary font-body">Nessun messaggio. Inizia tu la conversazione!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg) => {
        const isCurrentUser = user && msg.profile_id === user.id;

        return (
          <div
            key={msg.id}
            className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
                isCurrentUser
                  ? 'bg-accent text-primary rounded-br-none'
                  : 'bg-dark-bg text-secondary rounded-bl-none'
              }`}
            >
              {!isCurrentUser && (
                <span className="font-heading text-sm text-primary/80 block mb-1">
                  {msg.profile_username || "Utente"}
                </span>
              )}
              <p className="font-body text-base break-words">
                {msg.content}
              </p>
            </div>
          </div>
        );
      })}
      <div ref={chatEndRef} />
    </div>
  );
}