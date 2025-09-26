Progetto Finale React - Game Explorer

Una semplice applicazione React che mostra i giochi più recenti usando l'API di RAWG
.

Funzionalità

Fetch dei giochi più recenti tramite API RAWG

Visualizzazione dei giochi in schede responsive con effetto glass e hover

Lazy loading delle immagini con effetto blur

Filtraggio dei giochi per genere tramite dropdown interattivo (Headless UI)

Header con carosello immagini personalizzato (massimo 2 immagini visibili, scorrimento automatico)

Layout con Header, Sidebar e Footer riutilizzabili

Sidebar con effetto trasparente e glass

Responsive design ottimizzato per desktop e mobile

Tecnologie

React (latest) + JSX

React Router DOM

Tailwind CSS + DaisyUI

Headless UI (per dropdown personalizzato)

react-lazy-load-image-component

Vite come bundler

Come eseguire il progetto

Clona il repository:

git clone https://github.com/TUO_USERNAME/progetto-finale-doinanicolau.git


Installa le dipendenze:

npm install


Avvia il progetto in locale:

npm run dev


Inserisci la tua API_KEY di RAWG in .env:

VITE_API_KEY=la_tua_chiave_api

Struttura del progetto
src/
├─ components/     # Card, LazyLoadGameImage, Header, HeaderCarousel, Footer, Sidebar, GenresDropdown
├─ layout/         # Layout principale con Header e Footer
├─ pages/          # HomePage
├─ routes/         # Routing.jsx
├─ assets/         # eventuali immagini o icone

Note sul design

Tutti i componenti utilizzano Tailwind CSS per stili rapidi e responsive

Header: sfondo moderno in contrasto con il color sabbia

Carosello: massimo 2 immagini visibili, scorrimento automatico, immagini arrotondate con ombra

Card dei giochi: effetto glass, bordi stondati e hover con animazione di scala

Sidebar e pulsante toggle: trasparenza e backdrop blur

Dropdown generi: personalizzato tramite Headless UI, colori coordinati e bordo stondato