import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapPin, ChevronRight, Users, AlertCircle, Search } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { DUMMY_ORPHANAGES, getDemoImage } from "./dummyData";
import "./App.css";

function SearchPage() {
  const [orphanages, setOrphanages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingDummy, setUsingDummy] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (query) {
      setLoading(true);
      setUsingDummy(false);
      fetch(`http://localhost:3200/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setOrphanages(data);
          } else {
            // API returned empty — show filtered dummy data
            const filtered = DUMMY_ORPHANAGES.filter(o =>
              o.name.toLowerCase().includes(query.toLowerCase()) ||
              o.location.toLowerCase().includes(query.toLowerCase()) ||
              o.address.toLowerCase().includes(query.toLowerCase())
            );
            setOrphanages(filtered.length > 0 ? filtered : DUMMY_ORPHANAGES);
            setUsingDummy(true);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log("API unavailable, using dummy data:", err.message);
          // Backend down — show filtered dummy data
          const filtered = DUMMY_ORPHANAGES.filter(o =>
            o.name.toLowerCase().includes(query.toLowerCase()) ||
            o.location.toLowerCase().includes(query.toLowerCase()) ||
            o.address.toLowerCase().includes(query.toLowerCase())
          );
          setOrphanages(filtered.length > 0 ? filtered : DUMMY_ORPHANAGES);
          setUsingDummy(true);
          setLoading(false);
        });
    }
  }, [query]);

  // Resolve the correct image source
  const getImgSrc = (item, index) => {
    if (usingDummy || item._id?.startsWith?.("demo-")) {
      return getDemoImage(index);
    }
    return `http://localhost:3200/uploads/${item.photo}`;
  };

  // Skeleton loader
  const SkeletonCard = () => (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="premium-card" style={{ overflow: "hidden" }}>
        <div className="skeleton" style={{ height: 200 }}></div>
        <div className="p-4">
          <div className="skeleton skeleton-text" style={{ width: "70%" }}></div>
          <div className="skeleton skeleton-text short mt-2"></div>
          <div className="skeleton skeleton-text mt-3" style={{ width: "50%" }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div style={{ background: "var(--hc-surface-alt)", minHeight: "80vh" }} className="py-5">
        <div className="container">

          {/* Header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 animate-fade-in-up">
            <div>
              <h2 className="fw-bold" style={{ fontFamily: "var(--hc-font-heading)", color: "var(--hc-navy)" }}>
                Orphanages in <span style={{ color: "var(--hc-primary)" }}>{query}</span>
              </h2>
              <p style={{ color: "var(--hc-text-muted)" }}>
                {loading ? "Searching..." : `Found ${orphanages.length} centers needing support`}
              </p>
            </div>
            <button className="gradient-btn mt-2 mt-md-0" onClick={() => navigate("/location")}
              style={{ padding: "10px 24px", fontSize: "0.9rem" }}>
              <Search size={16} className="me-2" /> Change Location
            </button>
          </div>

          {/* Loading Skeletons */}
          {loading && (
            <div className="row">
              {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Empty State */}
          {!loading && orphanages.length === 0 && (
            <div className="empty-state animate-scale-in">
              <div className="empty-state-icon">
                <AlertCircle size={36} style={{ color: "var(--hc-text-muted)" }} />
              </div>
              <h4 className="fw-bold" style={{ color: "var(--hc-navy)" }}>No orphanages found</h4>
              <p style={{ color: "var(--hc-text-muted)", maxWidth: 400, margin: "0 auto" }}>
                We couldn't find any listings for "{query}". Try searching for a different location.
              </p>
              <button className="gradient-btn mt-3" onClick={() => navigate("/location")}
                style={{ padding: "10px 24px", fontSize: "0.9rem" }}>
                Try Another Location
              </button>
            </div>
          )}

          {/* Orphanage Cards */}
          {!loading && orphanages.length > 0 && (
            <div className="row">
              {orphanages.map((item, index) => (
                <div className="col-md-6 col-lg-4 mb-4" key={item._id}
                  style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}>
                  <div className="orphanage-card h-100"
                    onClick={() => navigate(`/view/${item._id}`)}>

                    {/* Image */}
                    <div className="card-img-wrapper">
                      <img src={getImgSrc(item, index)} alt={item.name} />
                    </div>

                    {/* Body */}
                    <div className="p-4 d-flex flex-column" style={{ flex: 1 }}>
                      <h5 className="fw-bold mb-2" style={{ fontFamily: "var(--hc-font-heading)", color: "var(--hc-navy)" }}>
                        {item.name}
                      </h5>
                      <p className="d-flex align-items-center gap-1 mb-2"
                        style={{ color: "var(--hc-text-muted)", fontSize: "0.85rem" }}>
                        <MapPin size={14} /> {item.address}
                      </p>

                      <div className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-2"
                        style={{
                          background: "rgba(34,197,94,0.08)", borderRadius: "var(--hc-radius-full)",
                          fontSize: "0.8rem", color: "#16a34a", fontWeight: 600, width: "fit-content"
                        }}>
                        <Users size={14} /> {item.children} Children
                      </div>

                      <p style={{ color: "var(--hc-text-secondary)", fontSize: "0.88rem", lineHeight: 1.7, flex: 1 }}>
                        {item.des?.slice(0, 100)}...
                      </p>

                      <div style={{ borderTop: "1px solid var(--hc-border-light)", paddingTop: 16, marginTop: 12 }}
                        className="d-flex justify-content-between align-items-center">
                        <div>
                          <small className="d-block" style={{ color: "var(--hc-text-muted)", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                            Urgent Need
                          </small>
                          <span className="badge-urgency-high" style={{ fontSize: "0.78rem" }}>
                            {item.urgentNeeds?.[0]?.item || "General Support"}
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-center"
                          style={{
                            width: 36, height: 36, borderRadius: "50%",
                            background: "var(--hc-primary-subtle)", color: "var(--hc-primary)",
                            transition: "var(--hc-transition)"
                          }}>
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchPage;