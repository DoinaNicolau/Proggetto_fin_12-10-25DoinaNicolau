// src/pages/LoginPage.jsx (Aggiornato per Tema Scuro)

import LoginForm from "../../components/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
   
    <main className="min-h-screen flex items-center justify-center p-8">
      
    
        <div className="w-full max-w-md">
         
          <LoginForm />
          
          {/* Link alla registrazione  */}
          <div className="text-center mt-4">
              <Link to="/register" className="text-gray-400 hover:text-red-500 transition-colors">
                  Non hai un account? Registrati
              </Link>
          </div>
        </div>
    </main>
  );
};

export default LoginPage;