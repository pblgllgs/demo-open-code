import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

const skills = [
  { name: "Java", color: "#f89820", icon: "☕" },
  { name: "Spring Boot", color: "#6DB33F", icon: "🍃" },
  { name: "JavaScript", color: "#F7DF1E", icon: "⚡" },
  { name: "React", color: "#61DAFB", icon: "⚛️" },
  { name: "TypeScript", color: "#3178C6", icon: "📘" },
  { name: "Node.js", color: "#339933", icon: "🟢" },
  { name: "Python", color: "#3776AB", icon: "🐍" },
  { name: "HTML/CSS", color: "#E34F26", icon: "🌐" },
  { name: "SASS", color: "#CC6699", icon: "🎨" },
  { name: "Git", color: "#F05032", icon: "📦" },
  { name: "GraphQL", color: "#E10098", icon: "🔗" },
  { name: "Redux", color: "#764ABC", icon: "🔄" },
  { name: "Vue.js", color: "#4FC08D", icon: "💚" },
  { name: "Figma", color: "#F24E1E", icon: "✏️" },
  { name: "Flutter", color: "#02569B", icon: "📱" },
  { name: "SQL", color: "#4479A1", icon: "🗄️" },
];

const experiences = [
  { year: "2023", works: [{ name: "Full Stack Developer", company: "Freelance", desc: "Desarrollo de aplicaciones web completas con React, Spring Boot y MySQL." }] },
  { year: "2022", works: [{ name: "Backend Developer", company: "Proyectos personales", desc: "Construccion de servicios con Java, Spring Boot y bases de datos." }] },
  { year: "2021", works: [{ name: "Frontend Developer", company: "Aprendizaje continuo", desc: "Desarrollo de interfaces con React, Angular y Vue.js." }] },
  { year: "2020", works: [{ name: "Junior Developer", company: "Inicio en programacion", desc: "Primeros pasos con HTML, CSS, JavaScript y Python." }] },
];

const aboutCards = [
  { title: "Desarrollador Full Stack", description: "Experiencia creando aplicaciones completas desde el backend con Java/Spring Boot hasta el frontend con React y Angular.", imgUrl: "💻" },
  { title: "Freelancer", description: "Trabajo de forma independiente, colaborando con clientes para transformar ideas en soluciones digitales reales.", imgUrl: "🚀" },
  { title: "Aprendiz Constante", description: "Siempre explorando nuevas tecnologias y mejores practicas de desarrollo de software.", imgUrl: "📚" },
];

const testimonials = [
  { name: "Carlos Mendez", company: "Tech Solutions", feedback: "Pablo es un desarrollador excepcional. Su capacidad para resolver problemas complejos es impresionante." },
  { name: "Maria Garcia", company: "Digital Agency", feedback: "Trabajar con Pablo fue una experiencia fantastica. Entrego el proyecto a tiempo y supero expectativas." },
  { name: "Ana Rodriguez", company: "StartupX", feedback: "Su conocimiento de Spring Boot y React nos ayudo a construir una plataforma robusta y escalable." },
];

const socialLinks = [
  { icon: "🐦", label: "Twitter", url: "https://twitter.com/pblgllgs" },
  { icon: "📘", label: "Facebook", url: "https://facebook.com/pblgllgs" },
  { icon: "📸", label: "Instagram", url: "https://instagram.com/pblgllgs" },
  { icon: "💼", label: "LinkedIn", url: "https://linkedin.com/in/pblgllgs" },
  { icon: "🐙", label: "GitHub", url: "https://github.com/pblgllgs" },
];

function Header() {
  return (
    <section id="home" className="min-h-[80vh] flex items-center bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-12 w-full">
        <div className="flex-1">
          <p className="text-indigo-600 font-medium mb-2">👋 Hola, soy</p>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4">Pablo</h1>
          <div className="flex gap-3 mb-6">
            <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">Developer</span>
            <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">Freelancer</span>
          </div>
          <p className="text-slate-500 text-lg max-w-md leading-relaxed">
            Apasionado por crear soluciones innovadoras con tecnologia. Especializado en Java, Spring Boot y React.
          </p>
        </div>
        <div className="flex-shrink-0 relative">
          <div className="w-64 h-64 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-8xl text-white">👨‍💻</span>
          </div>
          <div className="absolute -top-2 -right-2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl animate-bounce">☕</div>
          <div className="absolute -bottom-2 -left-2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl animate-bounce" style={{ animationDelay: "0.3s" }}>🍃</div>
          <div className="absolute top-1/2 -right-6 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl animate-bounce" style={{ animationDelay: "0.6s" }}>⚡</div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Conoce un poco sobre <span className="text-indigo-600">Pablo</span>
        </h2>
        <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutCards.map((card, i) => (
            <div key={i} className="bg-slate-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{card.imgUrl}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{card.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    API.get("/works")
      .then((res) => setWorks(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(works.map((w) => w.category))];
  const filtered = filter === "All" ? works : works.filter((w) => w.category === filter);

  return (
    <section id="work" className="py-20 bg-indigo-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Mi Seccion <span className="text-indigo-600">Portfolio</span>
        </h2>
        <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full mb-8" />

        {categories.length > 1 && (
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {categories.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  filter === tag
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-indigo-100 border border-slate-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-indigo-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-slate-200 rounded w-2/3" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">📂</p>
            <p className="text-slate-500 text-lg">
              {works.length === 0 ? "Aun no hay proyectos en el portafolio" : "No hay proyectos en esta categoria"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="h-48 bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center relative">
                  {project.imgUrl ? (
                    <img src={project.imgUrl} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-6xl text-white/30 group-hover:scale-125 transition-transform duration-500">💻</span>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                    {project.codeLink && (
                      <a href={project.codeLink} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg hover:scale-110 transition-transform">
                        🐙
                      </a>
                    )}
                    {project.projectLink && (
                      <a href={project.projectLink} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg hover:scale-110 transition-transform">
                        🔗
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-bold text-slate-800 mb-2">{project.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{project.description}</p>
                  {project.tags && (
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.split(",").map((tag) => (
                        <span key={tag.trim()} className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Habilidades <span className="text-indigo-600">& Experiencia</span>
        </h2>
        <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full mb-12" />
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {skills.map((skill) => (
                <div key={skill.name} className="flex flex-col items-center p-4 bg-slate-50 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform" style={{ backgroundColor: skill.color + "20" }}>
                    {skill.icon}
                  </div>
                  <p className="text-xs font-medium text-slate-600 text-center">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-[360px]">
            {experiences.map((exp, i) => (
              <div key={i} className="flex gap-4 mb-6 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{exp.year}</div>
                  {i < experiences.length - 1 && <div className="w-0.5 h-full bg-indigo-200 mt-1" />}
                </div>
                <div className="pb-6">
                  {exp.works.map((w, j) => (
                    <div key={j} className="mb-2 last:mb-0">
                      <h4 className="text-slate-800 font-semibold">{w.name}</h4>
                      <p className="text-indigo-600 text-sm">{w.company}</p>
                      <p className="text-slate-500 text-sm mt-1 leading-relaxed">{w.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-20 bg-indigo-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Testimonios <span className="text-indigo-600">de clientes</span></h2>
        <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full mb-12" />
        <div className="bg-white rounded-2xl shadow-sm p-10 relative">
          <div className="text-4xl text-indigo-200 mb-4">"</div>
          <p className="text-slate-600 text-lg leading-relaxed mb-6 italic">{t.feedback}</p>
          <div>
            <h4 className="text-slate-800 font-bold">{t.name}</h4>
            <p className="text-indigo-600 text-sm">{t.company}</p>
          </div>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-colors cursor-pointer">←</button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-colors cursor-pointer">→</button>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${i === current ? "bg-indigo-600 w-6" : "bg-slate-300 hover:bg-slate-400"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Gracias por contactarme!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2"><span className="text-indigo-600">Contacta</span>me</h2>
        <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full mb-12" />
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-xl">📧</div>
              <div>
                <p className="text-slate-400 text-sm">Email</p>
                <a href="mailto:pbl.gllgs@gmail.com" className="text-slate-800 font-medium hover:text-indigo-600 transition-colors">pbl.gllgs@gmail.com</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-xl">📱</div>
              <div>
                <p className="text-slate-400 text-sm">Telefono</p>
                <a href="tel:+56957592973" className="text-slate-800 font-medium hover:text-indigo-600 transition-colors">+(56) 9 57592973</a>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-lg hover:bg-indigo-100 hover:scale-110 transition-all" title={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex-1 space-y-4">
            <input type="text" placeholder="Tu nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="email" placeholder="Tu email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <textarea placeholder="Tu mensaje..." rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
            <button type="submit" className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors cursor-pointer">Enviar mensaje</button>
          </form>
        </div>
      </div>
      <div className="mt-16 pt-6 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-sm">@2024 Pablo Gallegos. Todos los derechos reservados.</p>
      </div>
    </section>
  );
}

export default function PortafolioAntiguo() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonials />
      <Footer />
    </div>
  );
}
