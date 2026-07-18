import { useState, useEffect } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const categories = ["Reactjs", "Nextjs", "Graphql", "Nestjs", "Spring Boot", "Otros"];

const emptyForm = { title: "", description: "", category: "Reactjs", tags: "", codeLink: "", projectLink: "", imgUrl: "" };

function WorkForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Titulo y descripcion son obligatorios");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
      <h3 className="text-lg font-bold text-slate-800">{initial.id ? "Editar Proyecto" : "Nuevo Proyecto"}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Titulo *</label>
          <input name="title" value={form.title} onChange={handleChange} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Categoria *</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">Descripcion *</label>
        <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">Tags (separados por coma)</label>
        <input name="tags" value={form.tags} onChange={handleChange} placeholder="React, Redux, Node.js" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Link del proyecto</label>
          <input name="projectLink" value={form.projectLink} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Link del codigo</label>
          <input name="codeLink" value={form.codeLink} onChange={handleChange} placeholder="https://github.com/..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">URL de imagen (opcional)</label>
        <input name="imgUrl" value={form.imgUrl} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer">
          {initial.id ? "Guardar cambios" : "Crear proyecto"}
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors cursor-pointer">
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default function PortfolioAdmin() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showImport, setShowImport] = useState(false);
  const [importJson, setImportJson] = useState("");
  const [importing, setImporting] = useState(false);

  useEffect(() => { fetchWorks(); }, []);

  const fetchWorks = async () => {
    try {
      const res = await API.get("/works");
      setWorks(res.data);
    } catch {
      toast.error("Error al cargar proyectos");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (form) => {
    try {
      const res = await API.post("/works", form);
      setWorks([...works, res.data]);
      setShowForm(false);
      toast.success("Proyecto creado");
    } catch {
      toast.error("Error al crear proyecto");
    }
  };

  const handleBulkImport = async () => {
    if (!importJson.trim()) {
      toast.error("Pega el JSON en el campo de texto");
      return;
    }
    let parsed;
    try {
      parsed = JSON.parse(importJson);
    } catch {
      toast.error("JSON invalido. Verifica el formato.");
      return;
    }
    const arr = Array.isArray(parsed) ? parsed : [parsed];
    setImporting(true);
    try {
      await API.post("/works/bulk", arr);
      toast.success(`${arr.length} proyecto(s) importado(s)`);
      setShowImport(false);
      setImportJson("");
      fetchWorks();
    } catch {
      toast.error("Error al importar proyectos");
    } finally {
      setImporting(false);
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("Eliminar TODOS los proyectos? Esta accion no se puede deshacer.")) return;
    try {
      await API.delete("/works");
      setWorks([]);
      toast.success("Todos los proyectos fueron eliminados");
    } catch {
      toast.error("Error al eliminar proyectos");
    }
  };

  const handleUpdate = async (form) => {
    try {
      const res = await API.put(`/works/${form.id}`, form);
      setWorks(works.map((w) => (w.id === form.id ? res.data : w)));
      setEditing(null);
      toast.success("Proyecto actualizado");
    } catch {
      toast.error("Error al actualizar proyecto");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Eliminar este proyecto?")) return;
    try {
      await API.delete(`/works/${id}`);
      setWorks(works.filter((w) => w.id !== id));
      toast.success("Proyecto eliminado");
    } catch {
      toast.error("Error al eliminar proyecto");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Portafolio</h1>
            <p className="text-slate-400 mt-1">Gestiona los proyectos de tu portafolio</p>
          </div>
          {!showForm && !editing && !showImport && (
            <div className="flex gap-2">
              <button onClick={() => setShowImport(true)} className="px-5 py-2.5 bg-slate-600 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors cursor-pointer">
                Importar JSON
              </button>
              {works.length > 0 && (
                <button onClick={handleDeleteAll} className="px-5 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors cursor-pointer">
                  Eliminar todo
                </button>
              )}
              <button onClick={() => setShowForm(true)} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer">
                + Nuevo proyecto
              </button>
            </div>
          )}
        </div>

        {showImport && (
          <div className="mb-8 bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Importar proyectos desde JSON</h3>
            <p className="text-slate-400 text-sm mb-4">
              Pega un array JSON con uno o varios proyectos. Cada objeto debe tener: title, description, category, tags, codeLink, projectLink, imgUrl.
            </p>
            <textarea
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
              rows={10}
              placeholder={'[{"title": "Mi Proyecto", "description": "...", "category": "Reactjs", "tags": "React, Node"}]'}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-mono placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button onClick={handleBulkImport} disabled={importing} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-50">
                {importing ? "Importando..." : `Importar ${importJson.trim() ? "" : "proyectos"}`}
              </button>
              <button onClick={() => { setShowImport(false); setImportJson(""); }} className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors cursor-pointer">
                Cancelar
              </button>
            </div>
          </div>
        )}

        {showForm && <div className="mb-8"><WorkForm initial={emptyForm} onSubmit={handleCreate} onCancel={() => setShowForm(false)} /></div>}
        {editing && <div className="mb-8"><WorkForm initial={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} /></div>}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-3" />
                <div className="h-3 bg-slate-200 rounded w-full mb-2" />
                <div className="h-3 bg-slate-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : works.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">📂</p>
            <p className="text-slate-500 text-lg">No hay proyectos aun</p>
            <p className="text-slate-400 text-sm mt-1">Crea tu primer proyecto para comenzar</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {works.map((work) => (
              <div key={work.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="h-40 bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center relative">
                  {work.imgUrl ? (
                    <img src={work.imgUrl} alt={work.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl text-white/30 group-hover:scale-125 transition-transform duration-500">💻</span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-800">{work.title}</h3>
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium flex-shrink-0 ml-2">
                      {work.category}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-3 line-clamp-2">{work.description}</p>
                  {work.tags && (
                    <div className="flex gap-1.5 flex-wrap mb-4">
                      {work.tags.split(",").map((tag) => (
                        <span key={tag.trim()} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(work)} className="flex-1 px-3 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-pointer">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(work.id)} className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer">
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
