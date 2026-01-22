import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import MapView from "./pages/MapView";
import "./App.css";

function Layout() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
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
  const currentLanguage = i18n.language === "zh-CN" ? "zh-CN" : "en";

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    document.title = t("app.title");
  }, [t, i18n.language]);

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-eyebrow">{t("app.brand")}</p>
          <h1>{t("app.title")}</h1>
          <p className="app-subtitle">{t("app.subtitle")}</p>
        </div>
        {import.meta.env.DEV ? (
          <div className="theme-switcher">
            <label htmlFor="theme-select">{t("theme.label")}</label>
            <select
              id="theme-select"
              value={manualTheme}
              onChange={(event) => setManualTheme(event.target.value)}
            >
              <option value="auto">{t("theme.auto")}</option>
              <option value="manuscript">{t("theme.manuscript")}</option>
              <option value="glass">{t("theme.glass")}</option>
              <option value="dashboard">{t("theme.dashboard")}</option>
            </select>
          </div>
        ) : null}
        <div className="app-nav-row">
          <nav className="app-nav" aria-label={t("nav.primaryLabel")}>
            <NavLink to="/" end>
              {t("nav.home")}
            </NavLink>
            <NavLink to="/molecules">{t("nav.molecules")}</NavLink>
            <NavLink to="/pathways">{t("nav.pathways")}</NavLink>
            <NavLink to="/map">{t("nav.map")}</NavLink>
            <NavLink to="/dashboard">{t("nav.dashboard")}</NavLink>
            <NavLink to="/about">{t("nav.about")}</NavLink>
          </nav>
          <div className="language-switcher" role="group" aria-label={t("language.label")}>
            <button
              type="button"
              className={currentLanguage === "en" ? "is-active" : ""}
              aria-pressed={currentLanguage === "en"}
              onClick={() => handleLanguageChange("en")}
            >
              {t("language.english")}
            </button>
            <span className="language-divider" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              className={currentLanguage === "zh-CN" ? "is-active" : ""}
              aria-pressed={currentLanguage === "zh-CN"}
              onClick={() => handleLanguageChange("zh-CN")}
            >
              {t("language.chinese")}
            </button>
          </div>
        </div>
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
        <span>{t("app.footerVersion")}</span>
        <span>{t("app.footerNote")}</span>
      </footer>
    </div>
  );
}

function Home() {
  const { t } = useTranslation();
  return (
    <section className="content-panel">
      <h2>{t("home.welcomeTitle")}</h2>
      <p>{t("home.welcomeIntro")}</p>
      <ul>
        <li>{t("home.feature1")}</li>
        <li>{t("home.feature2")}</li>
        <li>{t("home.feature3")}</li>
      </ul>
    </section>
  );
}

function Molecules() {
  const { t } = useTranslation();
  return (
    <section className="content-panel">
      <h2>{t("molecules.title")}</h2>
      <p>{t("molecules.description")}</p>
    </section>
  );
}

function Learn() {
  const { t } = useTranslation();
  return (
    <section className="content-panel">
      <h2>{t("learn.title")}</h2>
      <p>{t("learn.description")}</p>
    </section>
  );
}

function Pathways() {
  const { t } = useTranslation();
  return (
    <section className="content-panel">
      <h2>{t("pathways.title")}</h2>
      <p>{t("pathways.description")}</p>
    </section>
  );
}

function Dashboard() {
  const { t } = useTranslation();
  return (
    <section className="content-panel">
      <h2>{t("dashboard.title")}</h2>
      <p>{t("dashboard.description")}</p>
    </section>
  );
}

function Wrongbook() {
  const { t } = useTranslation();
  return (
    <section className="content-panel">
      <h2>{t("wrongbook.title")}</h2>
      <p>{t("wrongbook.description")}</p>
    </section>
  );
}

function About() {
  const { t } = useTranslation();
  return (
    <section className="content-panel">
      <h2>{t("about.title")}</h2>
      <p>{t("about.description")}</p>
    </section>
  );
}

export default function App() {
  return <Layout />;
}
