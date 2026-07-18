import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const publicLinks = [];

const privateLinks = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/weather", label: "Clima", icon: "🌤️" },
  { to: "/dashboard", label: "Usuarios", icon: "👥" },
  { to: "/portafolio", label: "Portafolio", icon: "💼" },
  { to: "/portafolio-antiguo", label: "Portafolio antiguo", icon: "📦" },
  { to: "/portfolio-admin", label: "Admin Portfolio", icon: "⚙️" },
];

export default function Navbar() {
  const { logout, login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowLogin(false);
        setError("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      setEmail("");
      setPassword("");
      setShowLogin(false);
      navigate("/");
    } catch {
      setError("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="bg-indigo-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:rotate-12 transition-transform">🤖</span>
          <span className="text-white font-bold text-lg hidden sm:block">DemoOpenCode</span>
        </Link>

        {/* Nav Links */}
        {(isAuthenticated ? privateLinks : publicLinks).length > 0 && (
        <nav className="flex items-center gap-1">
          {(isAuthenticated ? privateLinks : publicLinks).map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "text-indigo-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-base">{link.icon}</span>
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}
        </nav>
        )}

        {/* Auth buttons */}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-stone-600 text-white px-3 py-2 rounded-lg hover:bg-stone-700 transition-colors cursor-pointer text-sm"
          >
            <span>🚪</span>
            <span className="hidden sm:inline">Salir</span>
          </button>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="text-indigo-200 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                Iniciar Sesion
              </button>
              <Link
                to="/register"
                className="bg-white text-indigo-700 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors"
              >
                Registrarse
              </Link>
            </div>

            {/* Login Dropdown */}
            {showLogin && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-6 z-50">
                <h3 className="text-xl font-bold text-indigo-700 text-center mb-4">Iniciar Sesion</h3>
                {error && (
                  <p className="text-red-600 text-sm text-center mb-3">{error}</p>
                )}
                <form onSubmit={handleLogin} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-600"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-600"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Entrando..." : "Login"}
                  </button>
                </form>
                <p className="text-center mt-3 text-xs text-slate-500">
                  No tienes cuenta?{" "}
                  <Link to="/register" onClick={() => setShowLogin(false)} className="text-indigo-600 hover:underline">
                    Registrarse
                  </Link>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
