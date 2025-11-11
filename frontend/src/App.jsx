import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import RouterApp from "./RouterApp";
import { ToastContainer } from "react-toastify";
import "./App.css";

function AppContent() {
  const location = useLocation();

  const hideSidebarRoutes = ["/login", "/register", "/forget-password", "/reset-password"];
  const shouldShowSidebar = !hideSidebarRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="app-container" style={{ display: "flex" }}>
      {shouldShowSidebar && <Sidebar />}
      <main className="main-content" style={{ flex: 1 }}>
        <RouterApp />
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <ToastContainer />
    </Router>
  );
}

export default App;
