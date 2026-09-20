import "../style/Navbar.css"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Notes", href: "#notes" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  return (
    <nav aria-label="Main navigation" className="navbar">
      <div className="navbar-inner">
        <a href="#" className="navbar-name">
          Miguel Ortega
        </a>

        <div className="navbar-links">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} className="navbar-link">
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
