import { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import { supabase } from "../supabase/supabase-client";


export default function SessionProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Recupera la sessione attiva all’inizio
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // Listener per cambiamenti della sessione
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <SessionContext.Provider value={{ user, logout }}>
      {children}
    </SessionContext.Provider>
  );
}
