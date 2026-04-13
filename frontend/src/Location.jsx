import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, Loader2, Sparkles } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Location() {
  const [hover, setHover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const popularSearches = ["Mumbai", "Delhi", "Jaipur", "Bikaner", "Rajasthan"];

  return (
    <>
      <Navbar />
      <div className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "90vh",
          background: "linear-gradient(135deg, #f0fdfa 0%, #ecfeff 50%, #f0f9ff 100%)",
          position: "relative",
          overflow: "hidden"
        }}>

        {/* Decorative Shapes */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 200, height: 200, borderRadius: "50%", background: "rgba(13,148,136,0.05)", filter: "blur(40px)" }}></div>
        <div style={{ position: "absolute", bottom: "10%", right: "8%", width: 250, height: 250, borderRadius: "50%", background: "rgba(6,182,212,0.05)", filter: "blur(40px)" }}></div>

        <div className="container animate-scale-in" style={{ maxWidth: "560px", position: "relative", zIndex: 1 }}>
          <div className="premium-card overflow-hidden" style={{ border: "none", boxShadow: "var(--hc-shadow-xl)" }}>

            {/* Header */}
            <div className="text-center text-white p-5" style={{ background: "var(--hc-gradient-primary)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1), transparent 60%)" }}></div>
              <div className="position-relative">
                <div className="mx-auto mb-3 d-flex align-items-center justify-content-center animate-float"
                  style={{ width: 72, height: 72, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "20px", backdropFilter: "blur(10px)" }}>
                  <MapPin size={32} />
                </div>
                <h3 className="fw-bold mb-2" style={{ fontFamily: "var(--hc-font-heading)" }}>Where are you located?</h3>
                <p className="mb-0 small" style={{ opacity: 0.85 }}>We'll find the closest orphanages that need your help.</p>
              </div>
            </div>

            {/* Search Form */}
            <div className="p-4 p-md-5">
              <form onSubmit={handleSearch}>
                <div className="mb-4">
                  <label className="form-label fw-semibold" style={{ color: "var(--hc-text-secondary)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Enter City, State, or Zip Code
                  </label>
                  <div className="input-group" style={{
                    borderRadius: "var(--hc-radius-lg)", overflow: "hidden",
                    border: hover ? "2px solid var(--hc-primary)" : "2px solid var(--hc-border)",
                    transition: "var(--hc-transition)", boxShadow: hover ? "0 0 0 4px rgba(13,148,136,0.08)" : "none"
                  }}
                    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <span className="input-group-text border-0" style={{ background: "var(--hc-surface-alt)" }}>
                      <Search size={18} style={{ color: "var(--hc-primary)" }} />
                    </span>
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                      className="form-control border-0 py-3" placeholder="e.g. Mumbai, Rajasthan"
                      style={{ boxShadow: "none", background: "var(--hc-surface-alt)", fontFamily: "var(--hc-font-body)" }} />
                  </div>
                </div>

                <button type="submit" disabled={isLoading || !query.trim()}
                  className="gradient-btn-dark w-100 d-flex align-items-center justify-content-center gap-2"
                  style={{ padding: "16px", borderRadius: "var(--hc-radius)", fontSize: "1rem" }}>
                  {isLoading ? (
                    <>
                      <Loader2 className="me-2" size={18} style={{ animation: "spin 1s linear infinite" }} />
                      Searching nearby...
                    </>
                  ) : (
                    <>
                      <Search size={18} /> Find Orphanages
                    </>
                  )}
                </button>
              </form>

              {/* Popular Searches */}
              <div className="text-center mt-4">
                <p className="small mb-2" style={{ color: "var(--hc-text-muted)", fontWeight: 500 }}>Popular searches</p>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  {popularSearches.map((city, i) => (
                    <span key={i}
                      onClick={() => { setQuery(city); }}
                      className="px-3 py-1"
                      style={{
                        background: "var(--hc-primary-subtle)", color: "var(--hc-primary)",
                        borderRadius: "var(--hc-radius-full)", fontSize: "0.8rem", fontWeight: 600,
                        cursor: "pointer", transition: "var(--hc-transition)",
                        border: "1px solid transparent"
                      }}
                      onMouseEnter={e => { e.target.style.background = "var(--hc-primary)"; e.target.style.color = "#fff"; }}
                      onMouseLeave={e => { e.target.style.background = "var(--hc-primary-subtle)"; e.target.style.color = "var(--hc-primary)"; }}>
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Location;