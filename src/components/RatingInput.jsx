// src/components/RatingInput.jsx

import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../supabase/supabase-client';
import SessionContext from '../context/SessionContext'; 

// Icona stella SVG
const StarIcon = ({ filled, onClick, onMouseEnter, onMouseLeave, disabled }) => (
  <svg
    onClick={(e) => {
      e.stopPropagation(); 
      onClick?.(e);
    }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`w-5 h-5 transition-colors ${
      disabled ? "cursor-default opacity-50" : "cursor-pointer"
    } ${filled ? "text-red-500" : "text-gray-600 hover:text-red-400"}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.064 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
  </svg>
);

// Componente principale per l'input di valutazione
export default function RatingInput({ gameId }) {
    const { user } = useContext(SessionContext);
    const [userRating, setUserRating] = useState(null); 
    const [hoverRating, setHoverRating] = useState(0);
    const [ratingId, setRatingId] = useState(null); 
    const [loading, setLoading] = useState(true);

    const maxRating = 5;
    const isLoggedIn = !!user;

  
    const numericGameId = parseInt(gameId); 

    // 1. Fetch del voto esistente dell'utente
    useEffect(() => {
        if (!user || isNaN(numericGameId)) {
            setUserRating(null);
            setLoading(false);
            return;
        }
        
        const fetchRating = async () => {
            setLoading(true);
            
           
            const { data: records, error } = await supabase
                .from('ratings')
                .select('id, rating_value')
                .eq('user_id', user.id)
                .eq('game_id', numericGameId)
                .limit(1); 

            if (error) {
            
                 console.error("Errore fetch rating:", error.message);
            }
            
            // Gestione dell'array di risultati
            if (records && records.length > 0) {
                const data = records[0];
                setUserRating(data.rating_value);
                setRatingId(data.id);
            } else {
                setUserRating(null);
                setRatingId(null);
            }
            
            setLoading(false);
        };

        fetchRating();
    }, [user, numericGameId]); 

    // 2. Gestione dell'invio/aggiornamento del voto
    const handleRating = async (ratingValue) => {

  console.log("Utente Loggato (user.id):", user.id);
    console.log("Game ID inviato (numericGameId):", numericGameId); 
    console.log("Valore voto (ratingValue):", ratingValue);

        if (!isLoggedIn) {
            alert("Devi essere loggato per votare.");
            return;
        }
        
        setLoading(true);

        const newRating = {
            user_id: user.id,
            game_id: numericGameId, 
            rating_value: ratingValue,
        };

        let error;
        let data;

        if (ratingId) {
            // Aggiorna il voto esistente
            ({ error } = await supabase
                .from('ratings')
                .update(newRating)
                .eq('id', ratingId));

        } else {
           
            ({ data, error } = await supabase
                .from('ratings')
                .insert([newRating])
                .select('id')
                .single());
        }

        if (error) {
            console.error("Errore salvataggio voto:", error.message);
        } else {
            setUserRating(ratingValue);
            if (data) setRatingId(data.id);
        }
        setLoading(false);
    };

    const displayRating = hoverRating || userRating;

    return (
        <div 
            className={`flex items-center space-x-0.5 ${loading ? 'opacity-70 pointer-events-none' : ''}`}
            title={isLoggedIn ? "Vota questo gioco" : "Accedi per votare"}
        >
            {loading && <div className="animate-spin h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full mr-2"></div>}
            
            {[...Array(maxRating)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <StarIcon 
                        key={ratingValue}
                        filled={ratingValue <= displayRating}
                        onClick={() => handleRating(ratingValue)}
                        onMouseEnter={() => isLoggedIn && setHoverRating(ratingValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        disabled={!isLoggedIn}
                    />
                );
            })}
        </div>
    );
}