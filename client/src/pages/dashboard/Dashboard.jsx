import { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import API from "../../api/axios";

const STAT_CARDS = [
  { key: "totalTasks",     label: "Total Tasks",  gradient: "from-indigo-500 to-blue-600",   glow: "rgba(99,102,241,0.3)",  border: "rgba(99,102,241,0.35)", textColor: "#c7d2fe",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
  { key: "completedTasks", label: "Completed",    gradient: "from-emerald-500 to-green-600", glow: "rgba(16,185,129,0.3)",  border: "rgba(16,185,129,0.35)", textColor: "#a7f3d0",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { key: "pendingTasks",   label: "Pending",      gradient: "from-amber-500 to-yellow-600",  glow: "rgba(245,158,11,0.3)",  border: "rgba(245,158,11,0.35)", textColor: "#fde68a",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { key: "inProgressTasks",label: "In Progress",  gradient: "from-cyan-500 to-blue-500",     glow: "rgba(6,182,212,0.3)",   border: "rgba(6,182,212,0.35)",  textColor: "#a5f3fc",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
  { key: "overdueTasks",   label: "Overdue",      gradient: "from-rose-500 to-red-600",      glow: "rgba(239,68,68,0.3)",   border: "rgba(239,68,68,0.35)",  textColor: "#fecaca",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> },
];

const SkeletonCard = () => (
  <div className="rounded-2xl p-5 animate-pulse" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-xl" style={{ background: "rgba(255,255,255,0.1)" }} />
    </div>
    <div className="w-12 h-8 rounded-lg mb-2" style={{ background: "rgba(255,255,255,0.1)" }} />
    <div className="w-20 h-3 rounded-lg" style={{ background: "rgba(255,255,255,0.07)" }} />
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalTasks: 0, completedTasks: 0, pendingTasks: 0, inProgressTasks: 0, overdueTasks: 0 });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const fetchStats = async () => {
    try {
      const { data } = await API.get("/tasks/dashboard/stats");
      setStats(data);
    } catch (error) { console.log(error); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchStats(); setMounted(true); }, []);

  const completionPct = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0;

  return (
    <Layout>
      <div className={`transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: "#9ca3af" }}>An overview of your workspace activity</p>
        </div>

        {/* Welcome card */}
        <div className="relative overflow-hidden rounded-2xl p-6 mb-8"
          style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(6,182,212,0.2) 100%)", border: "1px solid rgba(99,102,241,0.4)", boxShadow: "0 8px 32px rgba(99,102,241,0.15)" }}>
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-indigo-300 text-xs font-bold tracking-widest uppercase mb-1">Welcome back</p>
              <h2 className="text-2xl font-extrabold text-white">{user?.name}</h2>
              <p className="text-sm mt-1" style={{ color: "#c4b5fd" }}>
                {user?.email} &nbsp;·&nbsp;
                <span className="capitalize font-semibold text-indigo-300">{user?.role}</span>
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: "#c4b5fd" }}>Completion rate</p>
                <p className="text-3xl font-extrabold text-white">{completionPct}%</p>
              </div>
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="url(#grad)" strokeWidth="3"
                    strokeDasharray={`${completionPct} ${100 - completionPct}`} strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 1s ease" }} />
                  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{completionPct}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {loading ? Array(5).fill(0).map((_, i) => <SkeletonCard key={i} />) :
            STAT_CARDS.map((card, i) => (
              <div key={card.key}
                className="rounded-2xl p-5 transition-all duration-300 cursor-default"
                style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${card.border}`, boxShadow: `0 4px 24px ${card.glow}`, transitionDelay: `${i * 60}ms` }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${card.glow}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 24px ${card.glow}`; }}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white mb-4 shadow-lg`}
                  style={{ boxShadow: `0 4px 12px ${card.glow}` }}>
                  {card.icon}
                </div>
                <p className="text-4xl font-extrabold text-white leading-none mb-1">{stats[card.key]}</p>
                <p className="text-xs font-bold tracking-wide" style={{ color: card.textColor }}>{card.label}</p>
              </div>
            ))
          }
        </div>

        {/* Progress bars */}
        {!loading && stats.totalTasks > 0 && (
          <div className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <h3 className="text-white font-bold text-base mb-5">Task Breakdown</h3>
            <div className="space-y-4">
              {[
                { label: "Completed",   value: stats.completedTasks,   color: "#10b981" },
                { label: "In Progress", value: stats.inProgressTasks,  color: "#06b6d4" },
                { label: "Pending",     value: stats.pendingTasks,     color: "#f59e0b" },
                { label: "Overdue",     value: stats.overdueTasks,     color: "#ef4444" },
              ].map((row) => {
                const pct = stats.totalTasks > 0 ? Math.round((row.value / stats.totalTasks) * 100) : 0;
                return (
                  <div key={row.label}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-semibold text-white">{row.label}</span>
                      <span className="text-sm font-bold text-white">{row.value} <span style={{ color: "#9ca3af" }}>({pct}%)</span></span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${pct}%`, background: row.color, boxShadow: `0 0 8px ${row.color}60` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;