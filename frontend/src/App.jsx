import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/home";
import Navbar from "../components/navbar";
import Clinicas from "../pages/clinicas";
import AdminLogin from "../pages/AdminLogin";
import Cursos from "../pages/cursos";
import AdminDashboard from "../pages/AdminDashboard";
import "./App.css";

function AppWrapper() {
  const location = useLocation();

  const hideNavbarRoutes = ["/Login", "/admin", "/login"];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/clinicas" element={<Clinicas />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
