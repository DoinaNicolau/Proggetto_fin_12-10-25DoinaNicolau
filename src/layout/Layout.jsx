import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";


export default function Layout(){

    return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenuto principale */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6">
        
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
    );
}