Progetto Finale – React RAWG Games

Una semplice applicazione React che mostra i giochi più recenti usando l'API di RAWG.

Funzionalità

Fetch dei giochi più recenti tramite API RAWG.

Visualizzazione dei giochi in schede responsive con effetto glass e hover.

Lazy loading delle immagini con effetto blur.

Filtraggio dei giochi per genere tramite dropdown interattivo (Headless UI).

Ricerca giochi per nome con query params e pagina dedicata /search.

Gestione utenti: possibilità di aggiungere un nuovo utente e modificare il profilo.

Header con carosello immagini personalizzato (massimo 2 immagini visibili, scorrimento automatico).

Layout modulare con Header, Sidebar e Footer riutilizzabili.

Sidebar con effetto trasparente e glass.

Rotte dinamiche:

/games/:genre → pagina dei giochi di un genere.

/games/:slug/:id → pagina dettagli gioco.

/search?query=<nome_gioco> → pagina risultati ricerca.

Responsive design ottimizzato per desktop e mobile.

Tecnologie

React (latest) + JSX

React Router DOM

Tailwind CSS + DaisyUI

Headless UI (per dropdown personalizzato)

react-lazy-load-image-component

Vite come bundler

Struttura del progetto
src/
├─ assets/             # immagini, icone
├─ components/         # Card, LazyLoadGameImage, Header, HeaderCarousel, Footer, Sidebar, GenresDropdown, Searchbar
├─ hooks/              # custom hook useFetchSolution.jsx
├─ layout/             # Layout principale con Header, Footer e Searchbar
├─ pages/              # tutte le pagine
│  ├─ homepage/        # HomePage
│  │   └─ index.jsx
│  ├─ genrepage/       # pagina dinamica per genere
│  │   └─ index.jsx
│  ├─ gamepage/        # pagina dinamica per gioco
│  │   └─ index.jsx
│  ├─ searchpage/      # pagina risultati ricerca
│  │   └─ index.jsx
│  ├─ userpage/        # gestione utenti (creazione/modifica)
│  │   └─ index.jsx
│  └─ error/           # pagina di errore
│      └─ index.jsx
├─ routes/             # Routing.jsx
├─ App.jsx
├─ App.css
├─ index.jsx
└─ main.jsx

Custom Hook: useFetchSolution

Per semplificare la gestione delle fetch API e ridurre codice ripetitivo, è stato creato un custom hook useFetchSolution, utilizzato in:

HomePage

GenrePage

GamePage

GenresDropdown

SearchPage

UserPage (per fetch dei dati utente)

Gestisce:

loading → stato di caricamento

data → dati ricevuti dalla fetch

error → eventuali errori della fetch

updateUrl → possibilità di aggiornare dinamicamente l’URL

Come eseguire il progetto

Clona il repository:

git clone https://github.com/TUO_USERNAME/progetto-finale-doinanicolau.git


Installa le dipendenze:

npm install


Avvia il progetto in locale:

npm run dev


Inserisci la tua API_KEY di RAWG in .env:

VITE_API_KEY=la_tua_chiave_api

Note sul design

Header: sfondo moderno in contrasto con il color sabbia.

Carosello: massimo 2 immagini visibili, scorrimento automatico, immagini arrotondate con ombra.

Card dei giochi: effetto glass, bordi stondati e hover con animazione di scala.

Sidebar e pulsante toggle: trasparenza e backdrop blur.

Dropdown generi: personalizzato tramite Headless UI, colori coordinati e bordo stondato.

Searchbar: sempre visibile nel layout, permette di cercare giochi per nome e mostrare i risultati nella pagina /search.

Gestione utenti: pagine dedicate per creare e modificare utenti, con interfaccia chiara e semplice.

Se vuoi, posso anche scrivere la sezione “Commit consigliato” per Git così che tutto sia coerente con le modifiche utente e GenrePage.

Vuoi che lo faccia?

ChatGPT può commettere errori. Assicurati di verif