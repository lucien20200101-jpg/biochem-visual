import { NavLink, Outlet } from "react-router-dom";
import "../styles/layout.css";

const navLinks = [
  { to: "/learn", label: "Learn" },
  { to: "/map", label: "Map" },
  { to: "/molecules", label: "Molecules" },
  { to: "/practice", label: "Practice" },
  { to: "/wrongbook", label: "WrongBook" },
  { to: "/dashboard", label: "Dashboard" },
];

export default function MainLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink to="/" className="brand">
          Biochem Visual
        </NavLink>
        <nav className="nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <span>Biochem Visual · Minimal scaffold</span>
      </footer>
    </div>
  );
}
