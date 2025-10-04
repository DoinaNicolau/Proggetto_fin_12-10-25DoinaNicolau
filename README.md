Progetto Finale – Portale di Videogiochi con React e RAWG API
Una web application moderna e performante costruita in React che funge da portale per la scoperta di videogiochi. L'applicazione utilizza l'API di RAWG per caricare dati sui giochi, Supabase per la gestione degli utenti e dei preferiti, e include una chat in tempo reale per la community.
Il design originale è stato completamente rivisto in favore di un'interfaccia dark-mode, professionale e d'impatto, con un forte focus sulla coerenza visiva e sulle micro-interazioni.
Funzionalità Principali
Design System Moderno (Dark Theme): Interfaccia scura e professionale basata su una palette colori definita (dark-bg, card-bg, primary, secondary, accent) e una tipografia gerarchica (Bebas Neue per i titoli, Inter per il testo).
Hero Section Dinamica a Schermo Intero: La homepage accoglie l'utente con una sezione immersiva a tutta pagina, con un carosello di immagini di sfondo dei giochi più popolari e un overlay sfumato per garantire la leggibilità.
Navbar Sticky e Responsive: Sostituita la vecchia sidebar con una moderna navbar fissa in alto, con effetto backdrop-blur. Include la navigazione principale, una searchbar integrata e la gestione del profilo utente. Completamente responsive con un menu a tendina per i dispositivi mobili.
Card Interattive: Design pulito per le card dei giochi, con animazioni hover (sollevamento) e micro-interazioni (es. il titolo cambia colore).
Chat in Tempo Reale con Stile: Interfaccia a "fumetti" che distingue visivamente i messaggi dell'utente loggato da quelli degli altri, con allineamento automatico e scroll-to-bottom.
Form di Autenticazione Coerenti: Pagine di Login e Registrazione stilizzate per integrarsi perfettamente con il dark theme, con stati di caricamento e feedback visivo per l'utente.
Gestione Preferiti Migliorata: Pulsante a forma di cuore con un'animazione "pop" al click (realizzata con Framer Motion) per un feedback utente gratificante.
Fetch Dati tramite API RAWG: Caricamento di liste di giochi (popolari, prossime uscite, per genere, ecc.).
Lazy Loading delle Immagini: Le immagini delle card vengono caricate in modo efficiente man mano che l'utente scorre la pagina.
Routing Avanzato con React Router:
/games/:slug/:id → Pagina di dettaglio del gioco.
/search?query=<nome_gioco> → Pagina dei risultati di ricerca.
/profile → Pagina del profilo utente.
Persistenza Dati con Supabase: Gestione di utenti (Auth), profili, preferiti e messaggi della chat.
Filosofia del Design
Il progetto è passato da un design sperimentale a un'estetica più matura e consolidata, seguendo questi principi:
Dark Theme & High Contrast: L'uso di uno sfondo molto scuro (#0D1117) e di un colore di accento vibrante (#E60049) crea un'esperienza visiva immersiva e migliora la leggibilità.
Tipografia Forte e Gerarchica: La combinazione di un font "display" audace per i titoli (Bebas Neue) e un font "sans-serif" pulito per il testo (Inter) stabilisce una chiara gerarchia visiva.
Coerenza Visiva: Tutti gli elementi interattivi (input, pulsanti, link) seguono uno stile uniforme in tutto il sito, creando un'esperienza utente prevedibile e professionale.
Micro-interazioni: L'uso di transizioni CSS e animazioni (Framer Motion) su pulsanti, card e altri elementi rende l'interfaccia più "viva" e reattiva.
Tecnologie Utilizzate
React (latest) + Vite
React Router DOM per il routing
Tailwind CSS per lo styling e il design system
Framer Motion per le animazioni
Headless UI per componenti UI accessibili (es. Dropdown)
Supabase per il backend (Autenticazione, Database, Storage)
react-lazy-load-image-component per il lazy loading
Struttura del Progetto
La struttura del progetto è stata riorganizzata per una maggiore chiarezza, sostituendo la Sidebar con una Navbar e introducendo componenti specifici come HeroCarousel.
code
Code

Struttura del progetto src/
 ├─ assets/ # immagini, icone 
 ├─ components/ # Card, LazyLoadGameImage, Header, HeaderCarousel, Footer, Sidebar, GenresDropdown, Searchbar 
 ├─ hooks/ # custom hook useFetchSolution.jsx 
 ├─ layout/ # Layout principale con Header, Footer e Searchbar 
 ├─ pages/ # tutte le pagine 
 │ ├─ homepage/ # HomePage 
 │ │ └─ index.jsx 
 │ ├─ genrepage/ # pagina dinamica per genere 
 │ │ └─ index.jsx 
 │ ├─ gamepage/ # pagina dinamica per gioco 
 │ │ └─ index.jsx 
 │ ├─ searchpage/ # pagina risultati ricerca 
 │ │ └─ index.jsx 
 │ ├─ userpage/ # gestione utenti (creazione/modifica) 
 │ │ └─ index.jsx 
 │ └─ error/ # pagina di errore 
 │ └─ index.jsx 
 ├─ routes/ # Routing.jsx 
 ├─ App.jsx 
 ├─ App.css 
 ├─ index.jsx 
 └─ main.jsx



Come Eseguire il Progetto
Clona il repository:
code
Bash
git clone https://github.com/TUO_USERNAME/progetto-finale-doinanicolau.git
Installa le dipendenze:
code
Bash
npm install
Configura le variabili d'ambiente:
Crea un file .env nella root del progetto e inserisci le tue chiavi di RAWG e Supabase.
code
Code
VITE_API_KEY=la_tua_chiave_api_rawg
VITE_SUPABASE_URL=il_tuo_url_supabase
VITE_SUPABASE_ANON_KEY=la_tua_chiave_anon_supabase
Avvia il progetto in locale:
code
Bash
npm run dev
Questo README ora riflette accuratamente lo stato attuale e la qualità del tuo progetto. Complimenti per l'ottimo lavoro di refactoring e design
37,9s
Use Arrow Up and Arrow Down to select a turn, Enter to jump to it, and Escape to return to the chat.
