Progetto Finale – Portale di Videogiochi con React e RAWG API

Una web application moderna e performante costruita in React che funge da portale per la scoperta e valutazione dei videogiochi.
L'applicazione utilizza l'API di RAWG per i dati dei giochi, Supabase per la gestione degli utenti e dei preferiti, e include una chat in tempo reale per la community.

Il design originale è stato completamente rivisto in dark-mode, con un’interfaccia professionale e coerente, micro-interazioni e forte focus sull’esperienza utente.

Funzionalità Principali
🎨 Design System Moderno (Dark Theme)

Interfaccia scura basata su una palette colori definita:

sfondo: dark-bg (#0D1117)

card: card-bg

testo: primary

placeholder/testi secondari: secondary

accenti: accent (#E60049)

Tipografia gerarchica:

Titoli: Bebas Neue

Testo: Inter

🏠 Hero Section Dinamica

Sezione a schermo intero con carosello dei giochi più popolari.

Overlay sfumato per garantire leggibilità.

🖥️ Navbar Sticky e Responsive

Navbar fissa con backdrop-blur e menu mobile a tendina.

Include la searchbar integrata e gestione profilo utente.

🎮 Card Interattive dei Giochi

Hover effect (sollevamento card).

Micro-interazioni sui titoli e pulsanti.

Sistema di voto ai giochi integrato: utenti possono aggiungere un voto da 1 a 5.

💬 Chat in Tempo Reale

Chat stile "fumetti" con distinzione tra messaggi dell’utente loggato e degli altri.

Scroll automatico in basso.

Integrata nelle pagine dei giochi.

📝 Form di Autenticazione

Login e registrazione coerenti con il dark theme.

Feedback visivo e stato di caricamento per l’utente.

❤️ Gestione Preferiti

Pulsante a forma di cuore con animazione "pop" al click (Framer Motion).

🔗 Fetch Dati tramite RAWG API

Caricamento giochi: popolari, prossime uscite, per genere, ecc.

🖼️ Lazy Loading delle Immagini

Immagini caricate man mano che l’utente scorre.

🔀 Routing Avanzato con React Router

/games/:slug/:id → Pagina dettaglio gioco

/search?query=<nome_gioco> → Pagina risultati ricerca

/profile → Profilo utente

🗄️ Persistenza Dati con Supabase

Autenticazione utenti, profili, preferiti e messaggi della chat.

Salvataggio dei voti degli utenti sui giochi.

Filosofia del Design

Dark Theme & High Contrast: sfondo scuro e accenti vibranti per leggibilità e immersione.

Tipografia forte e gerarchica: chiara distinzione tra titoli e testi.

Coerenza visiva: elementi uniformi in tutto il sito.

Micro-interazioni: transizioni CSS e animazioni (Framer Motion) per pulsanti, card e chat.

Tecnologie Utilizzate

React + Vite

React Router DOM

Tailwind CSS

Framer Motion

Headless UI

Supabase (Auth, Database, Storage)

react-lazy-load-image-component

Struttura del Progetto
src/
 ├─ assets/               # immagini, icone 
 ├─ components/           # Card, LazyLoadGameImage, Header, HeroCarousel, Footer, GenresDropdown, Searchbar, RealtimeChat
 ├─ hooks/                # custom hook useFetchSolution.jsx 
 ├─ layout/               # Layout principale con Header, Footer e Searchbar 
 ├─ pages/                # Pagine
 │  ├─ homepage/          # HomePage 
 │  │  └─ index.jsx 
 │  ├─ genrepage/         # Pagina dinamica per genere 
 │  │  └─ index.jsx 
 │  ├─ gamepage/          # Pagina dinamica per gioco 
 │  │  └─ index.jsx 
 │  ├─ searchpage/        # Pagina risultati ricerca 
 │  │  └─ index.jsx 
 │  ├─ userpage/          # Profilo utente 
 │  │  └─ index.jsx 
 │  └─ error/             # Pagina di errore 
 │     └─ index.jsx 
 ├─ routes/               # Routing.jsx 
 ├─ App.jsx 
 ├─ App.css 
 ├─ index.jsx 
 └─ main.jsx

Come Eseguire il Progetto

Clona il repository:

git clone https://github.com/TUO_USERNAME/progetto-finale-doinanicolau.git


Installa le dipendenze:

npm install


Configura le variabili d’ambiente (.env):

VITE_API_KEY=la_tua_chiave_api_rawg
VITE_SUPABASE_URL=il_tuo_url_supabase
VITE_SUPABASE_ANON_KEY=la_tua_chiave_anon_supabase


Avvia il progetto in locale:

npm run dev