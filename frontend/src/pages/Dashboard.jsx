import { useState, useEffect } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { exportUsersPdf } from "../utils/exportPdf";

const roleColors = {
  ADMIN: { bg: "bg-indigo-100", text: "text-indigo-700", dot: "bg-indigo-500" },
  USER: { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
};

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const emptyForm = { name: "", email: "", password: "", role: "USER" };

function UserForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial);
  const isEdit = !!initial.id;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Nombre y email son obligatorios");
      return;
    }
    if (!isEdit && !form.password.trim()) {
      toast.error("La contraseña es obligatoria");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
      <h3 className="text-lg font-bold text-slate-800">{isEdit ? "Editar Usuario" : "Nuevo Usuario"}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Nombre *</label>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Email *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Contraseña {isEdit ? "(dejar vacio para no cambiar)" : "*"}
          </label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required={!isEdit} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Rol *</label>
          <select name="role" value={form.role} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer">
          {isEdit ? "Guardar cambios" : "Crear usuario"}
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors cursor-pointer">
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(Array.isArray(res.data) ? res.data : res.data.content);
    } catch {
      toast.error("Error al obtener usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (form) => {
    try {
      const res = await API.post("/users", form);
      setUsers([...users, res.data]);
      setShowForm(false);
      toast.success("Usuario creado");
    } catch {
      toast.error("Error al crear usuario");
    }
  };

  const handleUpdate = async (form) => {
    try {
      const res = await API.put(`/users/${form.id}`, form);
      setUsers(users.map((u) => (u.id === form.id ? res.data : u)));
      setEditing(null);
      toast.success("Usuario actualizado");
    } catch {
      toast.error("Error al actualizar usuario");
    }
  };

  const handleToggleActive = async (id) => {
    const user = users.find((u) => u.id === id);
    const action = user.active ? "desactivar" : "activar";
    if (!confirm(`¿${action.charAt(0).toUpperCase() + action.slice(1)} este usuario?`)) return;
    try {
      const res = await API.patch(`/users/${id}/toggle-active`);
      setUsers(users.map((u) => (u.id === id ? res.data : u)));
      toast.success(`Usuario ${action === "desactivar" ? "desactivado" : "activado"}`);
    } catch {
      toast.error(`Error al ${action} usuario`);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalAdmins = users.filter((u) => u.role === "ADMIN").length;
  const activeUsers = users.filter((u) => u.active !== false).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Usuarios</h1>
            <p className="text-slate-400 mt-1">Gestiona los usuarios registrados en la plataforma</p>
          </div>
          {!showForm && !editing && (
            <div className="flex gap-2">
              <button onClick={() => exportUsersPdf(users)} className="px-5 py-2.5 bg-slate-600 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors cursor-pointer">
                Exportar PDF
              </button>
              <button onClick={() => setShowForm(true)} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer">
                + Nuevo usuario
              </button>
            </div>
          )}
        </div>

        {/* Forms */}
        {showForm && <div className="mb-8"><UserForm initial={emptyForm} onSubmit={handleCreate} onCancel={() => setShowForm(false)} /></div>}
        {editing && <div className="mb-8"><UserForm initial={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} /></div>}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-slate-400 text-sm">Total</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">{users.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-slate-400 text-sm">Admins</p>
            <p className="text-3xl font-bold text-indigo-600 mt-1">{totalAdmins}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-slate-400 text-sm">Activos</p>
            <p className="text-3xl font-bold text-emerald-600 mt-1">{activeUsers}</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Users Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse">
                <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4" />
                <div className="h-5 bg-slate-200 rounded w-2/3 mx-auto mb-2" />
                <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto mb-3" />
                <div className="h-6 bg-slate-200 rounded-full w-16 mx-auto" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-slate-500 text-lg">No se encontraron usuarios</p>
            {search && (
              <button onClick={() => setSearch("")} className="mt-3 text-indigo-600 hover:text-indigo-700 text-sm font-medium cursor-pointer">
                Limpiar busqueda
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((user) => {
              const colors = roleColors[user.role] || roleColors.USER;
              const isInactive = user.active === false;
              return (
                <div key={user.id} className={`bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center ${isInactive ? "opacity-50" : ""}`}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 ring-4 transition-all ${isInactive ? "bg-slate-400 ring-slate-200" : "bg-indigo-600 ring-indigo-100"}`}>
                    {getInitials(user.name)}
                  </div>
                  <h3 className="text-slate-800 font-semibold text-lg truncate w-full">{user.name}</h3>
                  <p className="text-slate-400 text-sm truncate w-full mt-1">{user.email}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                      {user.role}
                    </span>
                    {isInactive && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
                        Inactivo
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4 w-full">
                    <button onClick={() => setEditing(user)} className="flex-1 px-3 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-pointer">
                      Editar
                    </button>
                    <button
                      onClick={() => handleToggleActive(user.id)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        isInactive
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          : "bg-red-100 text-red-600 hover:bg-red-200"
                      }`}
                    >
                      {isInactive ? "Activar" : "Desactivar"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
