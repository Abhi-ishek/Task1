import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const NAV = [
  {
    name: "Dashboard", path: "/",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  },
  {
    name: "Projects", path: "/projects",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  },
  {
    name: "Tasks", path: "/tasks",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
  },
];

const ADMIN_NAV = [
  {
    name: "Manage Projects", path: "/projects",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
  {
    name: "Register Member", path: "/admin/register-member",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-[260px] min-h-screen flex flex-col py-6 px-4"
      style={{ background: "rgba(0,0,0,0.25)", borderRight: "1px solid rgba(255,255,255,0.1)" }}>

      {/* Logo */}
      <div className="flex items-center gap-3 px-3 mb-10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-white font-extrabold text-lg tracking-tight">TaskFlow</span>
      </div>

      {/* Main nav */}
      <p className="text-xs font-bold tracking-widest uppercase px-3 mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>Main</p>
      <div className="flex flex-col gap-1 mb-6">
        {NAV.map((item) => (
          <Link key={item.path} to={item.path}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
            style={isActive(item.path)
              ? { background: "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(6,182,212,0.25))", border: "1px solid rgba(99,102,241,0.5)", color: "#e0e7ff" }
              : { background: "transparent", border: "1px solid transparent", color: "#d1d5db" }}
            onMouseEnter={e => { if (!isActive(item.path)) { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#ffffff"; } }}
            onMouseLeave={e => { if (!isActive(item.path)) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#d1d5db"; } }}
          >
            <span style={{ color: isActive(item.path) ? "#818cf8" : "#9ca3af" }}>{item.icon}</span>
            {item.name}
            {isActive(item.path) && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />}
          </Link>
        ))}
      </div>

      {/* Admin section */}
      {user?.role === "admin" && (
        <>
          <div className="my-2 mx-3 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
          <p className="text-xs font-bold tracking-widest uppercase px-3 mt-4 mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>Admin</p>
          <div className="flex flex-col gap-1">
            {ADMIN_NAV.map((item) => (
              <Link key={item.path + item.name} to={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
                style={isActive(item.path)
                  ? { background: "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(6,182,212,0.25))", border: "1px solid rgba(99,102,241,0.5)", color: "#e0e7ff" }
                  : { background: "transparent", border: "1px solid transparent", color: "#d1d5db" }}
                onMouseEnter={e => { if (!isActive(item.path)) { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#ffffff"; } }}
                onMouseLeave={e => { if (!isActive(item.path)) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#d1d5db"; } }}
              >
                <span style={{ color: isActive(item.path) ? "#818cf8" : "#9ca3af" }}>{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </>
      )}

      {/* User chip */}
      <div className="mt-auto mx-1">
        <div className="flex items-center gap-3 p-3 rounded-xl"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-xs font-semibold truncate">{user?.name}</p>
            <p className="text-xs capitalize" style={{ color: "#9ca3af" }}>{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;