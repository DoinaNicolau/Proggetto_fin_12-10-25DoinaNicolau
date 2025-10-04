import { useEffect } from 'react';
import Routing from "./routes/Routing";
import SessionProvider from "./context/SessionProvider";
import FavoritesProvider from "./context/FavoritesProvider";
import './App.css';

export default function App() {
    useEffect(() => {
    document.body.className = '';
    
    document.body.classList.add('bg-gray-900', 'text-gray-200');

    return () => {
      document.body.classList.remove('bg-gray-900', 'text-gray-200');
    };
  }, []);
 
  return (
    <SessionProvider>
      <FavoritesProvider>
        <Routing />
      </FavoritesProvider>
    </SessionProvider>
  );
}