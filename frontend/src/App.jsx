import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import WeatherPage from "./pages/WeatherPage";
import Portafolio from "./pages/Portafolio";
import PortafolioAntiguo from "./pages/PortafolioAntiguo";
import PortfolioAdmin from "./pages/PortfolioAdmin";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weather"
            element={
              <ProtectedRoute>
                <WeatherPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portafolio"
            element={
              <ProtectedRoute>
                <Portafolio />
              </ProtectedRoute>
            }
          />
          <Route path="/portafolio-antiguo" element={<PortafolioAntiguo />} />
          <Route
            path="/portfolio-admin"
            element={
              <ProtectedRoute>
                <PortfolioAdmin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
