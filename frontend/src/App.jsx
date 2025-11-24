import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import RouterApp from "./RouterApp";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import "./App.css";

function AppContent() {
  const location = useLocation();

  // Define routes where sidebar and footer should be hidden
  const authRoutes = [
    "/login",
    "/register",
    "/forget-password",
    "/reset-password"
  ];

  const isAuthRoute = authRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  return (
    <div className="app-layout">
      <div className="app-container">
        {!isAuthRoute && <Sidebar />}
        <main className={`main-content ${isAuthRoute ? 'auth-route' : ''}`}>
          <RouterApp />
          {!isAuthRoute && <Footer />}
        </main>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
