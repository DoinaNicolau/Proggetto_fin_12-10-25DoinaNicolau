import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";


export default function Layout(){

    const [selectedGenre, setSelectedGenre] = useState("");

    return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar onGenreSelect={setSelectedGenre} />

      {/* Contenuto principale */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 ">
        
          <Outlet context={{ 
            selectedGenre,
             setSelectedGenre
            }} />
        </main>

        <Footer />
      </div>
    </div>
    );
}