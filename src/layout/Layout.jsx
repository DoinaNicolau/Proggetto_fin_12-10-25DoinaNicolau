import { Outlet } from "react-router"
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function Layout(){

    return (
         <div className="style-layout-system flex flex-col min-h-screen">
      <Header />

      <main className="style-main-content flex-1 p-6">
        
        <Outlet />
      </main>

      <Footer />
    </div>
    )
}