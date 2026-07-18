import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

const videos = [
  { id: "dQw4w9WgXcQ", title: "Spring Boot - Tutorial Completo" },
  { id: "9JqR30iCmQo", title: "React + Spring Boot Full Stack" },
  { id: "Ms_y5L4x5yY", title: "Microservicios con Spring Cloud" },
];

const skills = [
  { name: "Java", level: 90 },
  { name: "Spring Boot", level: 85 },
  { name: "React", level: 75 },
  { name: "MySQL", level: 80 },
  { name: "Docker", level: 70 },
  { name: "Git", level: 85 },
];

export default function Portafolio() {
  const [githubUser, setGithubUser] = useState(null);
  const [works, setWorks] = useState([]);
  const [loadingWorks, setLoadingWorks] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/pblgllgs")
      .then((res) => res.json())
      .then(setGithubUser)
      .catch(() => {});
  }, []);

  useEffect(() => {
    API.get("/works")
      .then((res) => setWorks(res.data))
      .catch(() => {})
      .finally(() => setLoadingWorks(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10">
          <img
            src={githubUser?.avatar_url || "https://avatars.githubusercontent.com/u/34486265?v=4"}
            alt="Avatar"
            className="w-36 h-36 rounded-full border-4 border-white/30 shadow-lg"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">{githubUser?.name || "pblgllgs"}</h1>
            <p className="text-indigo-200 text-lg mb-4">{githubUser?.bio || "Desarrollador Full Stack Java / Spring Boot / React"}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a href={githubUser?.html_url || "https://github.com/pblgllgs"} target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors">
                GitHub
              </a>
              <span className="bg-white/10 px-4 py-2 rounded-lg text-sm">
                {githubUser?.public_repos || 9} repositorios
              </span>
              <span className="bg-white/10 px-4 py-2 rounded-lg text-sm">
                {githubUser?.followers || 0} seguidores
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Banner texto */}
      <section className="bg-indigo-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold text-center mb-4">Sobre mi</h2>
          <p className="text-indigo-100 text-center max-w-2xl mx-auto leading-relaxed">
            Soy un desarrollador apasionado por crear soluciones backend robustas y escalables.
            Me especializo en el ecosistema Spring, construyendo API REST, microservicios y
            aplicaciones full stack con React. Cada proyecto es una oportunidad para aprender
            algo nuevo y mejorar como profesional.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-indigo-800 text-center mb-8">Habilidades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((s) => (
            <div key={s.name} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between mb-1">
                <span className="font-medium text-slate-700">{s.name}</span>
                <span className="text-sm text-slate-500">{s.level}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div className="bg-indigo-600 h-3 rounded-full transition-all duration-1000" style={{ width: `${s.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Banner 2 */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-3">Experiencia con Spring Boot</h2>
          <p className="text-white/80 max-w-xl mx-auto">
            Desde APIs RESTful simples hasta arquitecturas de microservicios complejas
            con Spring Cloud, GraphQL, WebSocket y mas.
          </p>
        </div>
      </section>

      {/* Proyectos del Backend */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-indigo-800 text-center mb-8">Proyectos</h2>
        {loadingWorks ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-5 animate-pulse">
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-3" />
                <div className="h-3 bg-slate-200 rounded w-full mb-2" />
                <div className="h-3 bg-slate-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : works.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">Aun no hay proyectos agregados</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {works.map((work) => (
              <div
                key={work.id}
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">{work.title}</h3>
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium flex-shrink-0 ml-2">
                    {work.category}
                  </span>
                </div>
                <p className="text-slate-500 text-sm mb-3 line-clamp-2">{work.description}</p>
                {work.tags && (
                  <div className="flex gap-1.5 flex-wrap mb-3">
                    {work.tags.split(",").map((tag) => (
                      <span key={tag.trim()} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  {work.codeLink && (
                    <a href={work.codeLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-slate-100 text-slate-600 py-2 rounded-lg text-xs font-medium hover:bg-indigo-100 hover:text-indigo-700 transition-colors">
                      Codigo
                    </a>
                  )}
                  {work.projectLink && (
                    <a href={work.projectLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-slate-100 text-slate-600 py-2 rounded-lg text-xs font-medium hover:bg-indigo-100 hover:text-indigo-700 transition-colors">
                      Ver proyecto
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Videos YouTube */}
      <section className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-indigo-800 text-center mb-8">Videos que me inspiran</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((v) => (
              <div key={v.id} className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="relative pb-[56.25%]">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-slate-700">{v.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner final */}
      <section className="bg-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-3">¿Trabajamos juntos?</h2>
          <p className="text-indigo-100 mb-6">Siempre abierto a nuevos proyectos y colaboraciones.</p>
          <a href="https://github.com/pblgllgs" target="_blank" rel="noopener noreferrer" className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
            Contactame en GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
