export default function Footer() {
  const socialLinks = [
    { name: "Facebook", href: "#", icon: "fab fa-facebook-f" },
    { name: "Twitter", href: "#", icon: "fab fa-twitter" },
    { name: "Instagram", href: "#", icon: "fab fa-instagram" },
    { name: "Twitch", href: "#", icon: "fab fa-twitch" },
  ];
  
  return (
    <footer className="bg-dark-bg border-t border-secondary/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Copyright Text */}
          <div className="text-center md:text-left">
            <p className="text-secondary font-body">
              © {new Date().getFullYear()} GAMES HUB. Tutti i diritti riservati.
            </p>
            <p className="text-sm text-secondary/50 mt-1">
              Dati forniti da RAWG.IO API
            </p>
          </div>

          {/* Social Media Links with Icons */}
          <div className="flex items-center gap-5">
            {socialLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                aria-label={link.name} 
                className="text-secondary/60 hover:text-accent transition-colors duration-300"
              >
                <i className={`${link.icon} text-xl`}></i>
              </a>
            ))}
          </div>
          
        </div>
      </div>
    </footer>
  );
}