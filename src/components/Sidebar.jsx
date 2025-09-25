 const [open, setOpen] = useState(false);

export default function Sidebar(){
    return (
        <aside
            className={`fixed top-0 left-0 h-full bg-blue-700 text-white w-64 p-4 transform ${
                open ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
            aria-label="Sidebar di navigazione"
            >
            <header className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Menu</h2>
                <button
                className="text-white text-xl"
                onClick={() => setOpen(!open)}
                aria-label="Apri/chiudi menu"
                >
                {open ? "×" : "☰"}
                </button>
            </header>

            <nav>
                <ul className="space-y-4">
                <li>
                    <a href="#" className="hover:text-blue-300">
                    Homepage
                    </a>
                </li>
                <li>
                    <a href="#" className="hover:text-blue-300">
                    Profilo
                    </a>
                </li>
                <li>
                    <a href="#" className="hover:text-blue-300">
                    Impostazioni
                    </a>
                </li>
                </ul>
            </nav>
        </aside>
    );
}