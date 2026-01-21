import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";

function Layout() {
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
        <nav className="app-nav" aria-label="Primary">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/molecules">Molecules</NavLink>
          <NavLink to="/pathways">Pathways</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="molecules" element={<Molecules />} />
          <Route path="pathways" element={<Pathways />} />
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
