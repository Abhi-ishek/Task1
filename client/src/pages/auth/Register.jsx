import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const steps = [
  { icon: "🚀", label: "Get started in seconds" },
  { icon: "🔒", label: "Secure & role-based access" },
  { icon: "📊", label: "Real-time dashboards" },
];

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await API.post("/auth/register", formData);
      login(data);
      toast.success("Account created! Welcome aboard 🎉");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
  };
  const inputFocus = (e) => {
    e.target.style.border = "1px solid rgba(99,102,241,0.7)";
    e.target.style.background = "rgba(99,102,241,0.08)";
    e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
  };
  const inputBlur = (e) => {
    e.target.style.border = "1px solid rgba(255,255,255,0.1)";
    e.target.style.background = "rgba(255,255,255,0.06)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "oklch(37.3% 0.034 259.733)" }}>

      {/* ── LEFT BRANDING PANEL ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">



        {/* Logo */}
        <div className={`relative z-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight">TaskFlow</span>
          </div>
        </div>

        {/* Hero text */}
        <div className={`relative z-10 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Start your<br />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              journey today.
            </span>
          </h2>
          <p className="text-white/50 text-base mb-10 leading-relaxed max-w-xs">
            Join thousands of teams already using TaskFlow to ship faster and collaborate smarter.
          </p>

          {/* Step list */}
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center text-lg shrink-0">
                  {s.icon}
                </div>
                <p className="text-white text-sm font-semibold">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#6366f1", "#06b6d4", "#a855f7", "#f59e0b"].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: c, borderColor: "oklch(37.3% 0.034 259.733)" }}>
                  {["A", "B", "C", "D"][i]}
                </div>
              ))}
            </div>
            <p className="text-white/40 text-xs">
              <span className="text-white font-semibold">2,400+</span> teams already onboard
            </p>
          </div>
        </div>

        <p className="relative z-10 text-white/20 text-xs">© 2025 TaskFlow. All rights reserved.</p>
      </div>

      {/* ── RIGHT REGISTER PANEL ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
        <div className={`w-full max-w-md transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          <div className="rounded-3xl p-8 sm:p-10"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}>

            {/* Header */}
            <div className="mb-8">
              <div className="lg:hidden flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-lg">TaskFlow</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Create account</h1>
              <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <div>
                <label className="block text-xs font-bold mb-2 tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-4 w-4" style={{ color: "rgba(255,255,255,0.3)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input type="text" name="name" placeholder="John Doe" onChange={handleChange} required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
                    style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold mb-2 tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-4 w-4" style={{ color: "rgba(255,255,255,0.3)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input type="email" name="email" placeholder="you@example.com" onChange={handleChange} required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
                    style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold mb-2 tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-4 w-4" style={{ color: "rgba(255,255,255,0.3)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input type={showPassword ? "text" : "password"} name="password" placeholder="Min. 6 characters" onChange={handleChange} required
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
                    style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center transition-colors"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                    {showPassword ? (
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-bold mb-2 tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["member", "admin"].map((r) => (
                    <label key={r}
                      className="relative flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer transition-all duration-200 text-sm font-semibold"
                      style={{
                        background: formData.role === r ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.06)",
                        border: formData.role === r ? "1px solid rgba(99,102,241,0.7)" : "1px solid rgba(255,255,255,0.1)",
                        color: formData.role === r ? "#a5b4fc" : "rgba(255,255,255,0.4)",
                        boxShadow: formData.role === r ? "0 0 0 3px rgba(99,102,241,0.15)" : "none",
                      }}>
                      <input type="radio" name="role" value={r} checked={formData.role === r}
                        onChange={handleChange} className="sr-only" />
                      {r === "member" ? (
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="capitalize">{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button disabled={loading} type="submit"
                  className="w-full py-4 rounded-xl font-bold text-sm text-white relative overflow-hidden transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)", boxShadow: "0 8px 32px rgba(99,102,241,0.35)" }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(99,102,241,0.5)"; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.35)"; }}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Create account
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;