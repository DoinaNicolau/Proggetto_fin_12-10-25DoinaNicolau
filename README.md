# Progetto Finale React - Game Explorer

Una semplice applicazione React che mostra i giochi più recenti usando l'API di [RAWG](https://rawg.io/).

## Funzionalità
- Fetch dei giochi più recenti tramite API RAWG
- Visualizzazione dei giochi in schede responsive con effetto glass e hover
- Lazy loading delle immagini con effetto blur
- Filtraggio dei giochi per genere tramite dropdown interattivo (Headless UI)
- Layout con Header, Sidebar e Footer riutilizzabili
- Sidebar con effetto trasparente e glass
- Responsive design ottimizzato per desktop e mobile

## Tecnologie
- React (latest) + JSX
- React Router DOM
- Tailwind CSS + DaisyUI
- Headless UI (per dropdown personalizzato)
- react-lazy-load-image-component
- Vite come bundler

## Come eseguire il progetto
1. Clona il repository:
   ```bash
   git clone https://github.com/TUO_USERNAME/progetto-finale-doinanicolau.git
Installa le dipendenze:

bash
Copia codice
npm install
Avvia il progetto in locale:

bash
Copia codice
npm run dev
Inserisci la tua API_KEY di RAWG in .env:

env
Copia codice
VITE_API_KEY=la_tua_chiave_api
Struttura del progetto
bash
Copia codice
src/
├─ components/     # Card, LazyLoadGameImage, Header, Footer, Sidebar, GenresDropdown
├─ layout/         # Layout principale con Header e Footer
├─ pages/          # HomePage
├─ routes/         # Routing.jsx
├─ assets/         # eventuali immagini o icone
Note sul design
Tutti i componenti utilizzano Tailwind CSS per stili rapidi e responsive

Card dei giochi con effetto glass, bordi stondati e hover con animazione di scala

Sidebar e pulsante toggle con trasparenza e backdrop blur

Dropdown generi personalizzato tramite Headless UI, con colori coordinati e bordo stondato










