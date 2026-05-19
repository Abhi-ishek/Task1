import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/axios";
import Layout from "../../components/Layout.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import CreateProjectModal from "../../components/CreateProjectModal.jsx";

// Gradient pairs cycled per card
const CARD_GRADIENTS = [
  { from: "#6366f1", to: "#06b6d4", glow: "rgba(99,102,241,0.2)", border: "rgba(99,102,241,0.25)" },
  { from: "#a855f7", to: "#6366f1", glow: "rgba(168,85,247,0.2)", border: "rgba(168,85,247,0.25)" },
  { from: "#06b6d4", to: "#10b981", glow: "rgba(6,182,212,0.2)", border: "rgba(6,182,212,0.25)" },
  { from: "#f59e0b", to: "#ef4444", glow: "rgba(245,158,11,0.2)", border: "rgba(245,158,11,0.25)" },
  { from: "#10b981", to: "#06b6d4", glow: "rgba(16,185,129,0.2)", border: "rgba(16,185,129,0.25)" },
];

const SkeletonCard = () => (
  <div className="rounded-2xl p-5 animate-pulse" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
    <div className="w-10 h-10 rounded-xl mb-4" style={{ background: "rgba(255,255,255,0.08)" }} />
    <div className="w-2/3 h-5 rounded mb-2" style={{ background: "rgba(255,255,255,0.08)" }} />
    <div className="w-full h-3 rounded mb-1.5" style={{ background: "rgba(255,255,255,0.05)" }} />
    <div className="w-3/4 h-3 rounded mb-6" style={{ background: "rgba(255,255,255,0.05)" }} />
    <div className="w-20 h-5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
  </div>
);

const Projects = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await API.delete(`/projects/${projectId}`);
      toast.success("Project deleted successfully");
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete project");
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Projects</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
            {projects.length} project{projects.length !== 1 ? "s" : ""} in your workspace
          </p>
        </div>

        {user?.role === "admin" && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", boxShadow: "0 6px 20px rgba(99,102,241,0.35)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(99,102,241,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,102,241,0.35)"; }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </button>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.05)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" style={{ color: "rgba(255,255,255,0.2)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="font-bold text-white mb-1">No projects yet</p>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>Create your first project to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => {
            const g = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
            return (
              <div
                key={project._id}
                className="rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 cursor-default"
                style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${g.border}`, boxShadow: `0 4px 24px ${g.glow}` }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${g.glow}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 24px ${g.glow}`; }}
              >
                <div className="flex items-start justify-between gap-2">
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white"
                    style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})`, boxShadow: `0 4px 12px ${g.glow}` }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  
                  {/* Delete button */}
                  {user?.role === "admin" && (
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="p-1.5 rounded-lg transition-all duration-150"
                      style={{ color: "rgba(248,113,113,0.5)" }}
                      title="Delete project"
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; e.currentTarget.style.color = "#f87171"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(248,113,113,0.5)"; }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Title & description */}
                <div>
                  <h2 className="text-base font-extrabold text-white mb-1 leading-tight">{project.title}</h2>
                  {project.description && (
                    <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {project.description}
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {/* Members chip */}
                  <span
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${g.from}25, ${g.to}15)`, border: `1px solid ${g.border}`, color: g.from }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    {project.members?.length ?? 0} member{(project.members?.length ?? 0) !== 1 ? "s" : ""}
                  </span>

                  {/* Created at */}
                  {project.createdAt && (
                    <span className="text-xs ml-auto" style={{ color: "rgba(255,255,255,0.25)" }}>
                      {new Date(project.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <CreateProjectModal
          closeModal={() => setShowModal(false)}
          fetchProjects={fetchProjects}
        />
      )}
    </Layout>
  );
};

export default Projects;