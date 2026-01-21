import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import MapView from "./pages/MapView";
import "./App.css";

function Layout() {
  const location = useLocation();
  const [manualTheme, setManualTheme] = useState("auto");
  const autoTheme = useMemo(() => {
    const { pathname } = location;
    if (pathname === "/molecules" || pathname.startsWith("/molecules/")) {
      return "glass";
    }
    if (pathname === "/dashboard" || pathname === "/wrongbook") {
      return "dashboard";
    }
    if (pathname === "/map" || pathname.startsWith("/learn/")) {
      return "manuscript";
    }
    return "manuscript";
  }, [location]);
  const resolvedTheme = manualTheme === "auto" ? autoTheme : manualTheme;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolvedTheme);
  }, [resolvedTheme]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-eyebrow">Biochem Visual</p>
          <h1>Biochemical Pathway Explorer</h1>
          <p className="app-subtitle">
            Navigate pathways, inspect molecules, and assemble custom views with
            interactive layouts.
          </p>
        </div>
        {import.meta.env.DEV ? (
          <div className="theme-switcher">
            <label htmlFor="theme-select">Theme</label>
            <select
              id="theme-select"
              value={manualTheme}
              onChange={(event) => setManualTheme(event.target.value)}
            >
              <option value="auto">Auto (route)</option>
              <option value="manuscript">Manuscript</option>
              <option value="glass">Glass</option>
              <option value="dashboard">Dashboard</option>
            </select>
          </div>
        ) : null}
        <nav className="app-nav" aria-label="Primary">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/molecules">Molecules</NavLink>
          <NavLink to="/pathways">Pathways</NavLink>
          <NavLink to="/map">Map</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="map" element={<MapView />} />
          <Route path="learn/*" element={<Learn />} />
          <Route path="molecules" element={<Molecules />} />
          <Route path="pathways" element={<Pathways />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="wrongbook" element={<Wrongbook />} />
          <Route path="about" element={<About />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <span>Layout v0.1</span>
        <span>Data panels and visualizations coming next.</span>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <section className="content-panel">
      <h2>Welcome</h2>
      <p>
        Start with an overview of curated biochemical pathways and connect
        related molecules to build interactive stories.
      </p>
      <ul>
        <li>Browse curated pathway maps.</li>
        <li>Pin molecules to compare reactions.</li>
        <li>Prepare dashboards for classroom walkthroughs.</li>
      </ul>
    </section>
  );
}

function Molecules() {
  return (
    <section className="content-panel">
      <h2>Molecule Library</h2>
      <p>
        Placeholder for molecule cards, filters, and structural previews. Add
        details such as molecular weight, charge, and pathway assignments here.
      </p>
    </section>
  );
}

function Learn() {
  return (
    <section className="content-panel">
      <h2>Learn Modules</h2>
      <p>
        Learning modules will introduce pathway concepts with guided steps,
        quizzes, and contextual molecule highlights.
      </p>
    </section>
  );
}

function Pathways() {
  return (
    <section className="content-panel">
      <h2>Pathway Maps</h2>
      <p>
        Placeholder for interactive pathway diagrams. This area will host zoom,
        annotations, and export tools.
      </p>
    </section>
  );
}

function Dashboard() {
  return (
    <section className="content-panel">
      <h2>Dashboard Overview</h2>
      <p>
        Track pathway coverage, learning milestones, and molecule engagement
        with a structured, data-driven layout.
      </p>
    </section>
  );
}

function Wrongbook() {
  return (
    <section className="content-panel">
      <h2>Wrongbook Review</h2>
      <p>
        Capture common mistakes, lab notes, and remediation steps to make review
        sessions more targeted.
      </p>
    </section>
  );
}

function About() {
  return (
    <section className="content-panel">
      <h2>About the Project</h2>
      <p>
        Biochem Visual is designed to make metabolic and signaling pathways
        accessible through interactive storytelling. This page can include team
        details, references, and roadmap updates.
      </p>
    </section>
  );
}

export default function App() {
  return <Layout />;
}
