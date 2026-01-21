import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import LearnIndex from "./pages/LearnIndex.jsx";
import LearnPathway from "./pages/LearnPathway.jsx";
import Login from "./pages/Login.jsx";
import Map from "./pages/Map.jsx";
import Molecules from "./pages/Molecules.jsx";
import Practice from "./pages/Practice.jsx";
import Register from "./pages/Register.jsx";
import WrongBook from "./pages/WrongBook.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="learn" element={<LearnIndex />} />
        <Route path="learn/:pathwayId" element={<LearnPathway />} />
        <Route path="map" element={<Map />} />
        <Route path="molecules" element={<Molecules />} />
        <Route path="practice" element={<Practice />} />
        <Route path="wrongbook" element={<WrongBook />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}
