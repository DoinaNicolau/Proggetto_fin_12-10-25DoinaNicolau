import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Searchbar from "../components/Searchbar";


export default function Layout({ children }){

    const [selectedGenre, setSelectedGenre] = useState("");

    return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar onGenreSelect={setSelectedGenre} />

      {/* Contenuto principale */}
      <div className="flex-1 flex flex-col">
        <Header />

      {/* Searchbar visibile sempre */}
      <div className="p-4 bg-[#F5E8C7]">
          <Searchbar />
      </div>

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