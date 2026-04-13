import { Heart } from "lucide-react";

function Footers() {
  return (
    <footer className="premium-footer text-light py-4">
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <div className="d-flex align-items-center gap-2">
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fff"
            }}>
              <Heart size={12} fill="currentColor" />
            </div>
            <span style={{ fontFamily: "var(--hc-font-heading)", fontWeight: 700, fontSize: "0.95rem" }}>
              HopeConnect Super Admin
            </span>
          </div>
          <div className="small" style={{ color: "var(--hc-text-muted)" }}>
            © {new Date().getFullYear()} HopeConnect. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footers;