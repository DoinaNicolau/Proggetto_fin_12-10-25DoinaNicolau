import { useEffect } from "react";
import { supabase } from "../supabase/supabase-client";

export default function TestSupabase() {
  useEffect(() => {
    console.log("Supabase client:", supabase);

    supabase.from("profiles").select("*").then(({ data, error }) => {
      console.log("Data:", data);
      console.log("Error:", error);
    });
  }, []);

  return <p>Controlla la console del browser</p>;
}
