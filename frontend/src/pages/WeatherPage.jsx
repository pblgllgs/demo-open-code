import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";

const weatherCodes = {
  0: { desc: "Despejado", icon: "☀️", bg: "from-amber-400 to-orange-500" },
  1: { desc: "Principalmente despejado", icon: "🌤️", bg: "from-blue-400 to-cyan-500" },
  2: { desc: "Parcialmente nublado", icon: "⛅", bg: "from-blue-300 to-blue-500" },
  3: { desc: "Nublado", icon: "☁️", bg: "from-gray-400 to-gray-600" },
  45: { desc: "Niebla", icon: "🌫️", bg: "from-gray-300 to-gray-500" },
  48: { desc: "Niebla con escarcha", icon: "🌫️", bg: "from-gray-300 to-blue-400" },
  51: { desc: "Lluvia ligera", icon: "🌦️", bg: "from-blue-400 to-indigo-500" },
  53: { desc: "Lluvia moderada", icon: "🌧️", bg: "from-blue-500 to-indigo-600" },
  55: { desc: "Lluvia intensa", icon: "🌧️", bg: "from-blue-600 to-indigo-700" },
  61: { desc: "Lluvia", icon: "🌧️", bg: "from-blue-500 to-blue-700" },
  63: { desc: "Lluvia moderada", icon: "🌧️", bg: "from-blue-500 to-indigo-600" },
  65: { desc: "Lluvia fuerte", icon: "🌧️", bg: "from-blue-600 to-purple-700" },
  71: { desc: "Nieve ligera", icon: "❄️", bg: "from-blue-200 to-blue-400" },
  73: { desc: "Nieve moderada", icon: "❄️", bg: "from-blue-300 to-blue-500" },
  75: { desc: "Nieve fuerte", icon: "❄️", bg: "from-blue-400 to-indigo-600" },
  80: { desc: "Chubascos", icon: "🌦️", bg: "from-cyan-500 to-blue-600" },
  81: { desc: "Chubascos moderados", icon: "⛈️", bg: "from-blue-500 to-purple-600" },
  82: { desc: "Chubascos violentos", icon: "⛈️", bg: "from-purple-500 to-indigo-700" },
  95: { desc: "Tormenta", icon: "⛈️", bg: "from-gray-600 to-purple-700" },
  96: { desc: "Tormenta con granizo", icon: "⛈️", bg: "from-gray-700 to-purple-800" },
  99: { desc: "Tormenta fuerte con granizo", icon: "⛈️", bg: "from-gray-800 to-purple-900" },
};

const days_ES = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
const months_ES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function WeatherParticles({ code }) {
  if (code >= 51 && code <= 65) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-4 bg-white/40 rounded-full animate-[fall_linear_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    );
  }
  if (code >= 71 && code <= 75) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-white/60 animate-[snowfall_linear_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${8 + Math.random() * 12}px`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ❄
          </div>
        ))}
      </div>
    );
  }
  if (code === 0 || code === 1) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-24 h-24 bg-yellow-300 rounded-full opacity-30 blur-xl animate-pulse" />
        <div className="absolute top-16 right-14 w-16 h-16 bg-yellow-200 rounded-full opacity-20 blur-lg animate-pulse delay-1000" />
      </div>
    );
  }
  return null;
}

function WindDirection({ degrees }) {
  const dirs = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
  const dir = dirs[Math.round(degrees / 45) % 8];
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
        style={{ transform: `rotate(${degrees}deg)` }}
      >
        <span className="text-white text-xs font-bold">↑</span>
      </div>
      <span className="text-white/80 text-sm">{dir}</span>
    </div>
  );
}

function CityAutocomplete({ value, onChange, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = (query) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=es`
        );
        const data = await res.json();
        setSuggestions(data.results || []);
        setShowDropdown(true);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);
    fetchSuggestions(val);
  };

  const handleSelect = (s) => {
    const label = s.admin1 ? `${s.name}, ${s.admin1}, ${s.country}` : `${s.name}, ${s.country}`;
    onChange(label);
    setShowDropdown(false);
    onSelect(s);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      e.preventDefault();
      handleSelect(suggestions[0]);
    }
  };

  return (
    <div ref={wrapperRef} className="relative flex-1">
      <input
        ref={inputRef}
        type="text"
        placeholder="Buscar ciudad..."
        value={value}
        onChange={handleChange}
        onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white/60"
      />
      {loading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        </div>
      )}
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/30">
          {suggestions.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => handleSelect(s)}
                className="w-full text-left px-4 py-3 hover:bg-emerald-100 transition-colors text-gray-800 text-sm cursor-pointer"
              >
                <span className="font-medium">{s.name}</span>
                {s.admin1 && <span className="text-gray-500">, {s.admin1}</span>}
                <span className="text-gray-400">, {s.country}</span>
                {s.elevation && (
                  <span className="text-gray-400 text-xs ml-2">~{Math.round(s.elevation)}m</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function WeatherPage() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Chillan, Nuble, Chile");
  const [coords, setCoords] = useState({ lat: -36.6066, lon: -72.1033 });

  useEffect(() => {
    fetchWeather(coords.lat, coords.lon);
  }, [coords]);

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=7`
      );
      const data = await res.json();
      setWeather(data.current);
      setForecast(data.daily);
    } catch (err) {
      console.error("Error fetching weather:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (s) => {
    setCoords({ lat: s.latitude, lon: s.longitude });
  };

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=es`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const s = data.results[0];
        setCoords({ lat: s.latitude, lon: s.longitude });
      }
    } catch (err) {
      console.error("Error geocoding:", err);
    }
  };

  const getCurrentDate = () => {
    const now = new Date();
    return `${days_ES[now.getDay()]} ${now.getDate()} ${months_ES[now.getMonth()]}`;
  };

  const weatherInfo = weather ? weatherCodes[weather.weather_code] || weatherCodes[0] : weatherCodes[0];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${weatherInfo.bg} transition-all duration-1000 relative`}>
      <Navbar />
      <WeatherParticles code={weather?.weather_code ?? 0} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6">

        {/* Search */}
        <div className="flex gap-2 mb-8">
          <CityAutocomplete
            value={city}
            onChange={setCity}
            onSelect={handleCitySelect}
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-colors cursor-pointer border border-white/30"
          >
            Buscar
          </button>
        </div>

        {/* Current Weather */}
        {loading && !weather ? (
          <div className="text-center py-16">
            <div className="text-white text-xl animate-pulse">Cargando clima...</div>
          </div>
        ) : (<>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-6 border border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <p className="text-white/80 text-lg">{getCurrentDate()}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-7xl font-light text-white">
                  {Math.round(weather.temperature_2m)}°
                </span>
              </div>
              <p className="text-white/90 text-xl mt-1">{weatherInfo.desc}</p>
              <p className="text-white/60 text-sm mt-1">Sensacion termica: {Math.round(weather.apparent_temperature)}°</p>
            </div>

            <div className="text-8xl animate-bounce">{weatherInfo.icon}</div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/20">
            <div className="text-center">
              <p className="text-white/60 text-sm">Humedad</p>
              <p className="text-white text-xl font-semibold">💧 {weather.relative_humidity_2m}%</p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-sm">Viento</p>
              <p className="text-white text-xl font-semibold">💨 {weather.wind_speed_10m} km/h</p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-sm">Direccion viento</p>
              <WindDirection degrees={weather.wind_direction_10m} />
            </div>
            <div className="text-center">
              <p className="text-white/60 text-sm">UV Index</p>
              <p className="text-white text-xl font-semibold">☀️ {weather.uv_index}</p>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h2 className="text-white font-semibold text-lg mb-4">Pronostico 7 dias</h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
            {forecast.time.map((date, i) => {
              const d = new Date(date + "T00:00:00");
              const dayName = i === 0 ? "Hoy" : days_ES[d.getDay()];
              const info = weatherCodes[forecast.weather_code[i]] || weatherCodes[0];
              return (
                <div
                  key={date}
                  className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-colors"
                >
                  <p className="text-white/80 text-sm font-medium">{dayName}</p>
                  <p className="text-3xl my-2">{info.icon}</p>
                  <p className="text-white font-bold text-lg">
                    {Math.round(forecast.temperature_2m_max[i])}°
                  </p>
                  <p className="text-white/60 text-sm">
                    {Math.round(forecast.temperature_2m_min[i])}°
                  </p>
                  <p className="text-white/50 text-xs mt-1">
                    💧 {forecast.precipitation_probability_max[i]}%
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        </>)}
      </div>
    </div>
  );
}
