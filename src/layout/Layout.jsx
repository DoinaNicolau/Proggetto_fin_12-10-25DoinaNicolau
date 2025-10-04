// src/layout/Layout.jsx

import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    
      <div className="min-h-screen flex flex-col  bg-dark-bg text-white">
      
      <Sidebar />

      <main className="flex-grow">
        {isHomePage && <Header />}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}