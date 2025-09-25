import { useState } from "react";

export default function Header(){
     const [open, setOpen] = useState(false);

    return (
         <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo o titolo */}
      <h1 className="text-xl font-bold text-blue-700">Progetto Finale</h1>

      {/* Navigazione rapida */}
      <nav>
        <ul className="flex space-x-6">
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-700">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-700">
              Chi siamo
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-700">
              Contatti
            </a>
          </li>
        </ul>
      </nav>
    </header>
    );
}