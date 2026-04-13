// components/Footer.js
import { Link } from "react-router-dom";
import { Heart, Github, Twitter, Linkedin, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="premium-footer text-light py-5">
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row g-5">
          {/* Brand */}
          <div className="col-12 col-md-5">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="brand-logo" style={{ width: 36, height: 36, borderRadius: 10 }}>
                <Heart size={16} fill="currentColor" />
              </div>
              <span className="fw-bold fs-5" style={{ fontFamily: "var(--hc-font-heading)" }}>HopeConnect</span>
            </div>
            <p style={{ color: "var(--hc-text-muted)", maxWidth: "360px", lineHeight: "1.8", fontSize: "0.9rem" }}>
              Building bridges between kind hearts and children in need. We provide a transparent, 
              easy-to-use platform to ensure your help reaches those who need it most.
            </p>
            {/* Social Icons */}
            <div className="d-flex gap-2 mt-3">
              <div className="social-icon"><Twitter size={16} /></div>
              <div className="social-icon"><Github size={16} /></div>
              <div className="social-icon"><Linkedin size={16} /></div>
              <div className="social-icon"><Mail size={16} /></div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-white mb-3" style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Quick Links
            </h6>
            <ul className="list-unstyled" style={{ fontSize: "0.9rem" }}>
              <li className="mb-2">
                <Link to="/location" className="footer-link">Find Orphanages</Link>
              </li>
              <li className="mb-2">
                <Link to="/impact" className="footer-link">Our Impact</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="footer-link">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-white mb-3" style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Support
            </h6>
            <ul className="list-unstyled" style={{ fontSize: "0.9rem" }}>
              <li className="mb-2">
                <a href="#" className="footer-link">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">Terms of Service</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-12 col-md-3">
            <h6 className="fw-bold text-white mb-3" style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Stay Updated
            </h6>
            <p style={{ color: "var(--hc-text-muted)", fontSize: "0.85rem", lineHeight: "1.7" }}>
              Get notified about orphanages near you and the impact of your donations.
            </p>
            <div className="d-flex gap-2 mt-2">
              <input
                type="email"
                placeholder="Your email"
                className="form-control border-0"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  borderRadius: "var(--hc-radius)",
                  padding: "10px 16px",
                  fontSize: "0.85rem",
                }}
              />
              <button
                className="btn px-3"
                style={{
                  background: "var(--hc-gradient-primary)",
                  color: "#fff",
                  borderRadius: "var(--hc-radius)",
                  whiteSpace: "nowrap",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                }}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <div className="small" style={{ color: "var(--hc-text-muted)" }}>
              © {new Date().getFullYear()} HopeConnect. All rights reserved.
            </div>
            <div className="small" style={{ color: "var(--hc-text-muted)" }}>
              Made with <Heart size={12} fill="#ef4444" style={{ color: "#ef4444" }} /> for a better world
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;