import { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext.jsx";
import CreateTaskModal from "../../components/CreateTaskModal.jsx";
import toast from "react-hot-toast";

const STATUS_CONFIG = {
  completed: { label: "Completed", color: "#10b981", bg: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.3)" },
  "in-progress": { label: "In Progress", color: "#06b6d4", bg: "rgba(6,182,212,0.15)", border: "rgba(6,182,212,0.3)" },
  todo: { label: "To Do", color: "#f59e0b", bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)" },
};

const PRIORITY_CONFIG = {
  high: { label: "High", color: "#f87171", dot: "#ef4444" },
  medium: { label: "Medium", color: "#fcd34d", dot: "#f59e0b" },
  low: { label: "Low", color: "#6ee7b7", dot: "#10b981" },
};

const SkeletonCard = () => (
  <div className="rounded-2xl p-5 animate-pulse" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
    <div className="flex justify-between mb-4">
      <div className="w-2/3 h-5 rounded-lg" style={{ background: "rgba(255,255,255,0.08)" }} />
      <div className="w-20 h-5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
    </div>
    <div className="w-full h-3 rounded mb-2" style={{ background: "rgba(255,255,255,0.05)" }} />
    <div className="w-3/4 h-3 rounded mb-6" style={{ background: "rgba(255,255,255,0.05)" }} />
    <div className="flex gap-2">
      <div className="w-16 h-6 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
      <div className="w-24 h-6 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
    </div>
  </div>
);

const Tasks = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    setUpdatingId(taskId);
    try {
      await API.put(`/tasks/${taskId}/status`, { status: newStatus });
      toast.success("Status updated!");
      fetchTasks();
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const filtered = filter === "all" ? tasks : tasks.filter(t => t.status === filter);

  const FILTERS = ["all", "todo", "in-progress", "completed"];

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Tasks</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
            {tasks.length} task{tasks.length !== 1 ? "s" : ""} total
          </p>
        </div>

        {user?.role === "admin" && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #6366f1, #06b6d4)",
              boxShadow: "0 6px 20px rgba(99,102,241,0.35)",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(99,102,241,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,102,241,0.35)"; }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Task
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all duration-150"
            style={
              filter === f
                ? { background: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(6,182,212,0.3))", border: "1px solid rgba(99,102,241,0.5)", color: "#c7d2fe" }
                : { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#d1d5db" }
            }
          >
            {f === "all" ? `All (${tasks.length})` : `${f} (${tasks.filter(t => t.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Task grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.05)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" style={{ color: "rgba(255,255,255,0.2)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="font-bold text-white mb-1">No tasks found</p>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
            {filter !== "all" ? "Try a different filter." : "Create your first task to get started."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((task) => {
            const s = STATUS_CONFIG[task.status] || STATUS_CONFIG.todo;
            const p = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;
            const isUpdating = updatingId === task._id;

            return (
              <div
                key={task._id}
                className="rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.13)",
                }}
                onMouseEnter={e => { e.currentTarget.style.border = "1px solid rgba(99,102,241,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.13)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-base font-bold text-white leading-snug">{task.title}</h2>
                  <span
                    className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-full capitalize"
                    style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
                  >
                    {s.label}
                  </span>
                </div>

                {/* Description */}
                {task.description && (
                  <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "#c9d1d9" }}>
                    {task.description}
                  </p>
                )}

                {/* Meta chips */}
                <div className="flex flex-wrap gap-2">
                  {/* Priority */}
                  <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: p.color }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.dot }} />
                    {p.label}
                  </span>

                  {/* Assigned */}
                  {task.assignedTo?.name && (
                    <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      {task.assignedTo.name}
                    </span>
                  )}

                  {/* Project */}
                  {task.project?.title && (
                    <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                      </svg>
                      {task.project.title}
                    </span>
                  )}
                </div>

                {/* Due date */}
                {task.dueDate && (
                  <p className="text-xs" style={{ color: "#9ca3af" }}>
                    Due: {new Date(task.dueDate).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  {/* Status changer */}
                  <select
                    value={task.status}
                    disabled={isUpdating}
                    onChange={e => handleStatusChange(task._id, e.target.value)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg outline-none transition-all cursor-pointer disabled:opacity-50"
                    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "#e5e7eb" }}
                  >
                    <option value="todo" style={{ background: "#1f2937", color: "#e5e7eb" }}>To Do</option>
                    <option value="in-progress" style={{ background: "#1f2937", color: "#e5e7eb" }}>In Progress</option>
                    <option value="completed" style={{ background: "#1f2937", color: "#e5e7eb" }}>Completed</option>
                  </select>

                  {/* Delete (admin only) */}
                  {user?.role === "admin" && (
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="p-1.5 rounded-lg transition-all duration-150"
                      style={{ color: "rgba(248,113,113,0.5)" }}
                      title="Delete task"
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; e.currentTarget.style.color = "#f87171"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(248,113,113,0.5)"; }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <CreateTaskModal
          closeModal={() => setShowModal(false)}
          fetchTasks={fetchTasks}
        />
      )}
    </Layout>
  );
};

export default Tasks;