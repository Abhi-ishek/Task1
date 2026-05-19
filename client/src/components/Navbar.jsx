import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();

  const roleColor = user?.role === "admin"
    ? { bg: "rgba(168,85,247,0.2)", border: "rgba(168,85,247,0.5)", text: "#d8b4fe" }
    : { bg: "rgba(6,182,212,0.2)", border: "rgba(6,182,212,0.5)", text: "#67e8f9" };

  return (
    <div className="flex items-center justify-between px-8 py-4"
      style={{ background: "rgba(0,0,0,0.2)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>

      <div>
        <p className="text-white font-bold text-base leading-tight">
          Good day, {user?.name?.split(" ")[0]} 👋
        </p>
        <p className="text-sm mt-0.5" style={{ color: "#9ca3af" }}>
          Here's what's happening with your workspace today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs font-bold px-3 py-1 rounded-full capitalize"
          style={{ background: roleColor.bg, border: `1px solid ${roleColor.border}`, color: roleColor.text }}>
          {user?.role}
        </span>

        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>

        <button onClick={logout}
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200"
          style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.35)", color: "#fca5a5" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.25)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.6)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.35)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;