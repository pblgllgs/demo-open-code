import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const repos = [
  { name: "demo-open-code", desc: "API REST con Spring Boot, JWT, MySQL y React", lang: "Java", url: "https://github.com/pblgllgs/demo-open-code" },
  { name: "spring-websocket-react", desc: "Comunicacion en tiempo real con WebSocket y React", lang: "Java", url: "https://github.com/pblgllgs/spring-websocket-react" },
  { name: "sb3-graphql-actor-movie-genre", desc: "API GraphQL con Spring Boot y Peliculas", lang: "Java", url: "https://github.com/pblgllgs/sb3-graphql-actor-movie-genre" },
  { name: "spring-cloud-stream", desc: "Microservicios con Spring Cloud Stream", lang: "Java", url: "https://github.com/pblgllgs/spring-cloud-stream" },
  { name: "sb3-microservices-2024-10", desc: "Arquitectura de microservicios con Spring Boot 3", lang: "Makefile", url: "https://github.com/pblgllgs/sb3-microservices-2024-10" },
  { name: "sb3-graphql", desc: "GraphQL con Spring Boot 3", lang: "Java", url: "https://github.com/pblgllgs/sb3-graphql" },
  { name: "restful-api-sb2-app", desc: "API RESTful con Spring Boot 2", lang: "Java", url: "https://github.com/pblgllgs/restful-api-sb2-app" },
  { name: "spring-property-configurations", desc: "Configuracion de propiedades en Spring", lang: "Java", url: "https://github.com/pblgllgs/spring-property-configurations" },
  { name: "spring-repository-entity-dto", desc: "Patron Repository, Entity y DTO en Spring", lang: "Java", url: "https://github.com/pblgllgs/spring-repository-entity-dto" },
];

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

const langColors = {
  Java: "#b07219",
  Makefile: "#427819",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
};

export default function Portafolio() {
  const [githubUser, setGithubUser] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/pblgllgs")
      .then((res) => res.json())
      .then(setGithubUser)
      .catch(() => {});
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

      {/* Repositorios */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-indigo-800 text-center mb-8">Repositorios en GitHub</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.25.25 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
                </svg>
                <h3 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">{repo.name}</h3>
              </div>
              <p className="text-slate-500 text-sm mb-3 line-clamp-2">{repo.desc}</p>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: langColors[repo.lang] || "#999" }} />
                <span className="text-xs text-slate-400">{repo.lang}</span>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-6">
          <a href="https://github.com/pblgllgs?tab=repositories" target="_blank" rel="noopener noreferrer" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            Ver todos los repositorios
          </a>
        </div>
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
