import { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import API from "../../api/axios";
import toast from "react-hot-toast";

const FIELD = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" };
const onFocus = (e) => { e.target.style.border = "1px solid rgba(99,102,241,0.7)"; e.target.style.background = "rgba(99,102,241,0.08)"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)"; };
const onBlur  = (e) => { e.target.style.border = "1px solid rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.06)"; e.target.style.boxShadow = "none"; };

const Label = ({ children }) => (
  <label className="block text-xs font-bold mb-2 tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>
    {children}
  </label>
);

const RegisterMember = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [fetchingMembers, setFetchingMembers] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const fetchMembers = async () => {
    try {
      const { data } = await API.get("/users/members");
      setMembers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingMembers(false);
    }
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/admin/register-member", formData);
      toast.success("Member registered successfully! 🎉");
      setFormData({ name: "", email: "", password: "" });
      fetchMembers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to register member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Register Member</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
            Add new team members to your workspace
          </p>
        </div>

        {/* ── Registration form ── */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm">Add New Member</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>They will be assigned the Member role</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label>Full Name</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4" style={{ color: "rgba(255,255,255,0.3)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text" name="name" value={formData.name} placeholder="e.g. John Doe" required
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
                  style={FIELD} onChange={handleChange} onFocus={onFocus} onBlur={onBlur}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label>Email Address</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4" style={{ color: "rgba(255,255,255,0.3)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email" name="email" value={formData.email} placeholder="e.g. john@example.com" required
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
                  style={FIELD} onChange={handleChange} onFocus={onFocus} onBlur={onBlur}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label>Temporary Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4" style={{ color: "rgba(255,255,255,0.3)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"} name="password" value={formData.password}
                  placeholder="Min. 6 characters" required minLength={6}
                  className="w-full pl-11 pr-12 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
                  style={FIELD} onChange={handleChange} onFocus={onFocus} onBlur={onBlur}
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center transition-colors"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
                >
                  {showPassword ? (
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
                  ) : (
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"/><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Role badge */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.3)", color: "#22d3ee" }}>
                Role: Member
              </span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Fixed — cannot be changed here</span>
            </div>

            <div className="pt-1">
              <button
                type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", boxShadow: "0 6px 20px rgba(99,102,241,0.35)" }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(99,102,241,0.5)"; } }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,102,241,0.35)"; }}
              >
                {loading ? (
                  <><svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>Registering...</>
                ) : (
                  <><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>Register Member</>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ── Members list ── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-white font-bold text-sm">Registered Members</p>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc" }}
            >
              {members.length} total
            </span>
          </div>

          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {fetchingMembers ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
                  <div className="w-9 h-9 rounded-xl shrink-0" style={{ background: "rgba(255,255,255,0.08)" }} />
                  <div className="flex-1">
                    <div className="w-32 h-3.5 rounded mb-2" style={{ background: "rgba(255,255,255,0.08)" }} />
                    <div className="w-48 h-3 rounded" style={{ background: "rgba(255,255,255,0.05)" }} />
                  </div>
                </div>
              ))
            ) : members.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.3)" }}>No members registered yet.</p>
              </div>
            ) : (
              members.map((member, i) => (
                <div key={member._id} className="flex items-center gap-4 px-6 py-4 transition-all duration-150"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ background: `linear-gradient(135deg, hsl(${(i * 60) % 360}, 70%, 55%), hsl(${(i * 60 + 40) % 360}, 70%, 55%))` }}
                  >
                    {member.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{member.name}</p>
                    <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>{member.email}</p>
                  </div>
                  <span className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.25)", color: "#22d3ee" }}>
                    Member
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterMember;
