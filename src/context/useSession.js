// src/context/useSession.js
import { useContext } from "react";
import SessionContext from "./SessionContext";

// Questo è il nostro hook personalizzato
export function useSession() {
  return useContext(SessionContext);
}
