import { useState } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const features = [
  {
    icon: "\uD83E\uDDE0",
    title: "Machine Learning",
    desc: "Algoritmos que aprenden de datos para hacer predicciones y tomar decisiones sin programacion explicita.",
    color: "from-violet-500 to-purple-600",
    iconBg: "bg-violet-100",
  },
  {
    icon: "\uD83D\uDCAC",
    title: "Procesamiento de Lenguaje Natural",
    desc: "Computadoras que entienden, interpretan y generan lenguaje humano de forma natural.",
    color: "from-blue-500 to-cyan-600",
    iconBg: "bg-blue-100",
  },
  {
    icon: "\uD83D\uDC41\uFE0F",
    title: "Vision por Computadora",
    desc: "Sistemas que analizan e interpretan imagenes y videos como los humanos.",
    color: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-100",
  },
  {
    icon: "\uD83E\uDD16",
    title: "Robots Autonomos",
    desc: "Maquinas inteligentes que navegan y operan en el mundo real sin intervencion humana.",
    color: "from-orange-500 to-red-600",
    iconBg: "bg-orange-100",
  },
  {
    icon: "\uD83C\uDFA8",
    title: "Generacion de Contenido",
    desc: "IA que crea arte, musica, texto y codigo de forma autonoma e innovadora.",
    color: "from-pink-500 to-rose-600",
    iconBg: "bg-pink-100",
  },
  {
    icon: "\uD83D\uDD12",
    title: "IA y Seguridad",
    desc: "Deteccion de fraudes, ciberseguridad y proteccion de datos con inteligencia artificial.",
    color: "from-amber-500 to-yellow-600",
    iconBg: "bg-amber-100",
  },
];

const stats = [
  { value: "97M+", label: "Nuevos trabajos para 2025" },
  { value: "$15.7T", label: "Impacto economico en 2030" },
  { value: "72%", label: "Empresas usando IA" },
  { value: "3.5B", label: "Usuarios de IA generativa" },
];

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    setSending(true);
    try {
      await API.post("/contact-messages", form);
      toast.success("Mensaje enviado correctamente");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("No fue posible enviar el mensaje");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-5xl font-bold leading-tight mb-6">
              El Futuro es{" "}
              <span className="text-indigo-300">Inteligencia Artificial</span>
            </h2>
            <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
              Explora las ultimas innovaciones en IA que estan transformando el mundo.
              Desde machine learning hasta generacion de contenido, la inteligencia artificial
              esta redefiniendo como vivimos y trabajamos.
            </p>
          </div>
          <div className="flex-shrink-0 text-9xl animate-bounce">
            🤖
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-indigo-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-indigo-300">{stat.value}</p>
              <p className="text-indigo-100 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-indigo-800 text-center mb-12">
          Areas de la Inteligencia Artificial
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 group hover:-translate-y-1"
            >
              <div className={`w-14 h-14 ${f.iconBg} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-2">{f.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{f.desc}</p>
              <div className={`mt-4 h-1 w-16 rounded-full bg-gradient-to-r ${f.color}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Contactame</h2>
            <p className="text-indigo-100 mb-8">
              Tienes un proyecto en mente? Escribeme y hagamoslo realidad.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Tu nombre"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-indigo-200 border border-white/30 focus:outline-none focus:border-white"
              />
              <input
                type="email"
                placeholder="Tu email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-indigo-200 border border-white/30 focus:outline-none focus:border-white"
              />
            </div>
            <textarea
              placeholder="Tu mensaje..."
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-indigo-200 border border-white/30 focus:outline-none focus:border-white resize-none"
            />
            <div className="text-center">
              <button
                type="submit"
                disabled={sending}
                className="px-8 py-3 bg-white text-indigo-700 rounded-lg font-semibold hover:bg-indigo-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-indigo-300 text-center py-6 text-sm">
        <p>Demo Open Code &copy; 2026 &mdash; Spring Boot + React</p>
      </footer>
    </div>
  );
}
