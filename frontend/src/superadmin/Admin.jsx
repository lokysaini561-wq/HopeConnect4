import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Mail, Lock, Shield } from "lucide-react";
import "../App.css";

function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:3200/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      navigate("/allorphanage");
    } else {
      setMsg("Invalid Email or Password");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <img src="https://images.unsplash.com/photo-1633158834806-766387547d2c?w=600&auto=format&fit=crop&q=60" alt="bg" />
      </div>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(139,92,246,0.5) 100%)",
        zIndex: 1
      }}></div>

      <div className="auth-card">
        <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff"
          }}>
            <Shield size={18} />
          </div>
          <span style={{ fontFamily: "var(--hc-font-heading)", fontWeight: 800, fontSize: "1.15rem" }}>HopeConnect</span>
        </div>

        <div className="text-center mb-1">
          <span className="px-3 py-1" style={{
            background: "rgba(139,92,246,0.1)", color: "#7c3aed",
            borderRadius: "var(--hc-radius-full)", fontSize: "0.7rem", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "1px"
          }}>
            Super Admin
          </span>
        </div>

        <h3 className="mb-1 mt-3" style={{ fontSize: "1.5rem" }}>Admin Access</h3>
        <p className="text-center mb-4" style={{ color: "var(--hc-text-muted)", fontSize: "0.9rem" }}>
          Sign in to access the super admin panel
        </p>

        {msg && (
          <div className="alert py-2 text-center" style={{
            background: "rgba(239,68,68,0.08)", color: "#dc2626",
            border: "none", borderRadius: "var(--hc-radius)", fontSize: "0.88rem", fontWeight: 500
          }}>
            {msg}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold small" style={{ color: "var(--hc-text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Email Address
            </label>
            <div className="input-group">
              <span className="input-group-text border-0" style={{ background: "var(--hc-surface-alt)", borderRadius: "var(--hc-radius) 0 0 var(--hc-radius)" }}>
                <Mail size={16} style={{ color: "var(--hc-text-muted)" }} />
              </span>
              <input type="email" placeholder="admin@hopeconnect.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="premium-input form-control" style={{ borderRadius: "0 var(--hc-radius) var(--hc-radius) 0" }} required />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold small" style={{ color: "var(--hc-text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text border-0" style={{ background: "var(--hc-surface-alt)", borderRadius: "var(--hc-radius) 0 0 var(--hc-radius)" }}>
                <Lock size={16} style={{ color: "var(--hc-text-muted)" }} />
              </span>
              <input type="password" placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="premium-input form-control" style={{ borderRadius: "0 var(--hc-radius) var(--hc-radius) 0" }} required />
            </div>
          </div>

          <button type="submit" className="w-100 fw-bold" disabled={loading}
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
              color: "#fff", border: "none", padding: "14px",
              borderRadius: "var(--hc-radius)", fontSize: "0.95rem",
              cursor: "pointer", transition: "var(--hc-transition)",
              boxShadow: "0 4px 15px rgba(139,92,246,0.35)"
            }}>
            {loading ? (
              <span className="d-flex align-items-center justify-content-center gap-2">
                <div className="spinner-border spinner-border-sm"></div> Signing In...
              </span>
            ) : "Sign In as Super Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
