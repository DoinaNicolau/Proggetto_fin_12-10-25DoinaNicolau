import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Searchbar from "../components/Searchbar";

export default function Layout() {
  const [selectedGenre, setSelectedGenre] = useState("");

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <Sidebar onGenreSelect={setSelectedGenre} />

      {/* Contenuto principale */}
      <div className="flex-1 flex flex-col w-full">
        <Header />

        {/* Searchbar  */}
        <div className="p-2">
          <Searchbar />
        </div>

        {/* Outlet */}
        <div className="flex-1 w-full">
          <Outlet context={{ selectedGenre, setSelectedGenre }} />
        </div>

        <Footer />
      </div>
    </div>
  );
}
