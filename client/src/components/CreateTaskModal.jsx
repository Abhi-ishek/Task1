import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";

const FIELD_STYLE = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
};
const onFocus = (e) => {
  e.target.style.border = "1px solid rgba(99,102,241,0.7)";
  e.target.style.background = "rgba(99,102,241,0.08)";
  e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
};
const onBlur = (e) => {
  e.target.style.border = "1px solid rgba(255,255,255,0.1)";
  e.target.style.background = "rgba(255,255,255,0.06)";
  e.target.style.boxShadow = "none";
};

const Label = ({ children }) => (
  <label className="block text-xs font-bold mb-2 tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>
    {children}
  </label>
);

const CreateTaskModal = ({ closeModal, fetchTasks }) => {
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    assignedTo: "",
    project: "",
  });

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (error) { console.log(error); }
  };

  const fetchMembers = async () => {
    try {
      const { data } = await API.get("/users/members");
      setMembers(data);
    } catch (error) { console.log(error); }
  };

  useEffect(() => {
    fetchProjects();
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/tasks", formData);
      toast.success("Task created successfully! ✅");
      fetchTasks();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200";
  const selectClass = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 cursor-pointer";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{
          background: "oklch(32% 0.034 259.733)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-6 py-5 sticky top-0 z-10"
          style={{ background: "oklch(32% 0.034 259.733)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-lg font-extrabold text-white tracking-tight">Create New Task</h2>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            style={{ color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Title */}
          <div>
            <Label>Task Title</Label>
            <input
              type="text" name="title" placeholder="e.g. Design landing page"
              className={inputClass} style={FIELD_STYLE}
              onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required
            />
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <textarea
              name="description" placeholder="Describe what needs to be done..."
              rows={3} className={inputClass} style={{ ...FIELD_STYLE, resize: "none" }}
              onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required
            />
          </div>

          {/* Due Date + Priority row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Due Date</Label>
              <input
                type="date" name="dueDate"
                className={inputClass} style={{ ...FIELD_STYLE, colorScheme: "dark" }}
                onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required
              />
            </div>
            <div>
              <Label>Priority</Label>
              <select
                name="priority" className={selectClass}
                style={{ ...FIELD_STYLE, color: "rgba(255,255,255,0.7)" }}
                onChange={handleChange} onFocus={onFocus} onBlur={onBlur}
              >
                <option value="low" style={{ background: "#1f2937", color: "#e5e7eb" }}>🟢 Low</option>
                <option value="medium" selected style={{ background: "#1f2937", color: "#e5e7eb" }}>🟡 Medium</option>
                <option value="high" style={{ background: "#1f2937", color: "#e5e7eb" }}>🔴 High</option>
              </select>
            </div>
          </div>

          {/* Assign To */}
          <div>
            <Label>Assign To</Label>
            <select
              name="assignedTo" className={selectClass}
              style={{ ...FIELD_STYLE, color: "rgba(255,255,255,0.7)" }}
              onChange={handleChange} onFocus={onFocus} onBlur={onBlur}
            >
              <option value="" style={{ background: "#1f2937", color: "#e5e7eb" }}>— Unassigned —</option>
              {members.map((m) => (
                <option key={m._id} value={m._id} style={{ background: "#1f2937", color: "#e5e7eb" }}>{m.name} ({m.email})</option>
              ))}
            </select>
          </div>

          {/* Project */}
          <div>
            <Label>Project</Label>
            <select
              name="project" className={selectClass}
              style={{ ...FIELD_STYLE, color: "rgba(255,255,255,0.7)" }}
              onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required
            >
              <option value="" style={{ background: "#1f2937", color: "#e5e7eb" }}>— Select a project —</option>
              {projects.map((proj) => (
                <option key={proj._id} value={proj._id} style={{ background: "#1f2937", color: "#e5e7eb" }}>{proj.title}</option>
              ))}
            </select>
          </div>

          {/* Divider */}
          <div className="h-px" style={{ background: "rgba(255,255,255,0.07)" }} />

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="button" onClick={closeModal}
              className="flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-150"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
            >
              Cancel
            </button>
            <button
              type="submit" disabled={loading}
              className="flex-1 py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", boxShadow: "0 6px 20px rgba(99,102,241,0.35)" }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(99,102,241,0.5)"; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,102,241,0.35)"; }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Create Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;