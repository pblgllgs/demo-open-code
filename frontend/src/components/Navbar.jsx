import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/weather", label: "Clima", icon: "🌤️" },
  { to: "/dashboard", label: "Usuarios", icon: "👥" },
  { to: "/portafolio", label: "Portafolio", icon: "💼" },
];

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
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
        <nav className="flex items-center gap-1">
          {links.map((link) => {
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

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 bg-stone-600 text-white px-3 py-2 rounded-lg hover:bg-stone-700 transition-colors cursor-pointer text-sm"
        >
          <span>🚪</span>
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </header>
  );
}
