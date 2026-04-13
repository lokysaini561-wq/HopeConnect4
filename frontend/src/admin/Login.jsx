import { useState } from "react";
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { Heart, Mail, Lock } from "lucide-react";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:3200/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      navigate("/orphanage");
    } else {
      setMsg("Invalid Email or Password");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5" alt="bg" />
      </div>
      <div className="auth-overlay"></div>

      <div className="auth-card">
        {/* Logo */}
        <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
          <div className="brand-logo" style={{ width: 38, height: 38, borderRadius: 10 }}>
            <Heart size={16} fill="currentColor" />
          </div>
          <span style={{ fontFamily: "var(--hc-font-heading)", fontWeight: 800, fontSize: "1.15rem" }}>HopeConnect</span>
        </div>

        <h3 className="mb-1" style={{ fontSize: "1.5rem" }}>Welcome Back</h3>
        <p className="text-center mb-4" style={{ color: "var(--hc-text-muted)", fontSize: "0.9rem" }}>
          Sign in to manage your orphanages
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
              <input type="email" placeholder="you@example.com" value={email}
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

          <button type="submit" className="gradient-btn w-100" disabled={loading}
            style={{ padding: "12px", fontSize: "0.95rem" }}>
            {loading ? (
              <span className="d-flex align-items-center justify-content-center gap-2">
                <div className="spinner-border spinner-border-sm"></div> Signing In...
              </span>
            ) : "Sign In"}
          </button>

          <div className="auth-divider">
            <span className="small" style={{ color: "var(--hc-text-muted)" }}>or</span>
          </div>

          <p className="text-center mb-0">
            <span style={{ color: "var(--hc-text-secondary)", fontSize: "0.9rem" }}>Don't have an account? </span>
            <Link to="/register" style={{ color: "var(--hc-primary)", fontWeight: 700, textDecoration: "none" }}>
              Register Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
