export default function Footer (){
    return (
        <footer className="bg-blue-700 text-white p-4 mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
                <p className="text-sm">
                © {new Date().getFullYear()} Progetto Finale - Tutti i diritti riservati
                </p>

                <nav className="mt-2 sm:mt-0">
                <ul className="flex space-x-4">
                    <li>
                    <a href="#" className="hover:text-blue-300">
                        Privacy
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:text-blue-300">
                        Termini
                    </a>
                    </li>
                    <li>
                    <a href="#" className="hover:text-blue-300">
                        Contatti
                    </a>
                    </li>
                </ul>
                </nav>
            </div>
        </footer>
    )
}