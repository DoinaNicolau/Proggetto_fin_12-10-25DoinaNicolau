import { useState, useContext } from "react"; 
import { supabase } from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext"; 
import RealtimeChat from "./RealtimeChat";

export default function Chatbox({ game }) {
  
  
  const rawgApiKey = import.meta.env.VITE_API_KEY; 


  const { user } = useContext(SessionContext); 
  
  const [message, setMessage] = useState("");

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Controlli di validità
    if (!user) {
      alert("Devi effettuare il login per inviare messaggi");
      return;
    }
    if (message.trim().length === 0) return;

    const senderUsername = user.user_metadata?.username || user.email;

    // 3. Inserimento del messaggio
    const { error } = await supabase.from("messages").insert([
      {
        content: message,
        profile_id: user.id,
        profile_username: senderUsername,
        game_id: game.id,
      },
    ]);

    if (error) {
      console.error("Errore inserimento messaggio:", error);
    } else {
      setMessage("");
    }
  };

  return (
    // Sezione Chatbox: Sfondo scuro e bordo sottile
    <section 
      className="mt-12 w-full max-w-4xl mx-auto bg-gray-900 rounded-lg border border-gray-700 shadow-xl" 
      aria-label="Chat dei giocatori"
    >
      {/* Header della Chatbox */}
      <header className="p-4 border-b border-gray-700">
        <h2 className="text-2xl font-heading text-white">
          CHAT DELLA COMMUNITY
        </h2>
      </header>

      {/* Area Messaggi (scrollable) */}
      <div className="h-96 overflow-y-auto p-4 hide-scrollbar"> 
     
        <ul>
        
          <RealtimeChat game={game} />
        </ul>
      </div>

      {/* Form di invio */}
      <footer className="p-4 border-t border-gray-700">
        <form onSubmit={handleMessageSubmit} className="flex flex-wrap gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={user ? "Scrivi il tuo messaggio..." : "Effettua il login per chattare"}
            disabled={!user}
            className="flex-1 min-w-0 px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
          />
          <button
            type="submit"
            disabled={!user || message.trim().length === 0}
            className="px-6 py-2 bg-red-600 text-white font-heading rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            INVIA
          </button>
        </form>
      </footer>
    </section>
  );
}