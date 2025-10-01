import { useState } from "react";
import { supabase } from "../supabase/supabase-client";
import { useSession } from "../context/useSession";
import RealtimeChat from "./RealtimeChat";

export default function Chatbox({ game }) {
  const { user } = useSession();
  const [message, setMessage] = useState("");

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Devi effettuare il login per inviare messaggi");
      return;
    }
    if (message.trim().length === 0) return;

    const { error } = await supabase.from("messages").insert([
      {
        content: message,
        profile_id: user.id,
        profile_username: user.email,
        game_id: game.id,
      },
    ]);

    if (error) console.error("Errore inserimento messaggio:", error);
    else setMessage("");
  };

  return (
    <section className="mt-6 w-full max-w-4xl mx-auto" aria-label="Chat dei giocatori">
      <header className="px-4 pt-4 mb-2">
        <h2 className="text-xl font-bold text-gray-800">
          💬 Gamers chat
        </h2>
      </header>

      <div className="max-h-80 sm:max-h-96 overflow-y-auto mb-4 p-2 bg-white/30 rounded-lg">
        <ul>
          <RealtimeChat game={game} />
        </ul>
      </div>

      <form onSubmit={handleMessageSubmit} className="flex gap-2 px-4 pb-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Scrivi un messaggio..."
          className="flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/70"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-semibold flex-shrink-0"
        >
          Invia
        </button>
      </form>
    </section>
  );
}
