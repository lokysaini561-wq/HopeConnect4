import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Heart, Home, Package, Smile, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { DUMMY_ORPHANAGES, DUMMY_DONATIONS, DUMMY_DONATION_CATEGORIES, DUMMY_TESTIMONIALS } from "./dummyData";
import "./App.css";

const ImpactPage = () => {
  const [donationCategorie, setDonationCategorie] = useState([]);
  const [donations, setDonations] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const orphanages = DUMMY_ORPHANAGES.slice(0, 6);

  const totalDonationsCount = donations.length || 10;
  const livesImpacted = totalDonationsCount * 3 + 120;
  const itemsDistributed = totalDonationsCount * 12 + 540;

  const statCards = [
    {
      label: "Donation Requests", value: totalDonationsCount,
      icon: <Heart size={24} />, sub: "Contributions initiated",
      color: "#ef4444", bg: "rgba(239,68,68,0.08)"
    },
    {
      label: "Lives Impacted", value: livesImpacted,
      icon: <Smile size={24} />, sub: "Children supported",
      color: "#f59e0b", bg: "rgba(245,158,11,0.08)"
    },
    {
      label: "Items Distributed", value: itemsDistributed.toLocaleString("en-IN"),
      icon: <Package size={24} />, sub: "Clothes, Books, Food kits",
      color: "#22c55e", bg: "rgba(34,197,94,0.08)"
    },
    {
      label: "Orphanages", value: orphanages.length,
      icon: <Home size={24} />, sub: "Partners registered",
      color: "#3b82f6", bg: "rgba(59,130,246,0.08)"
    }
  ];

  const COLORS = ["#0d9488", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: "var(--hc-navy)", color: "#fff", padding: "10px 16px",
          borderRadius: "var(--hc-radius)", fontSize: "0.85rem", boxShadow: "var(--hc-shadow-lg)"
        }}>
          <p className="mb-1" style={{ fontWeight: 700 }}>{label}</p>
          <p className="mb-0" style={{ color: "var(--hc-primary-light)" }}>{payload[0].value} items</p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    fetch("http://localhost:3200/donatedata")
      .then(res => res.json())
      .then(data => {
        const allowedCategories = ["Food", "Education", "Clothes", "Shelter", "Other"];
        let finalData = [];
        let otherTotal = 0;
        data.forEach(item => {
          if (allowedCategories.includes(item._id)) {
            finalData.push({ name: item._id, value: item.total });
          } else {
            otherTotal += item.total;
          }
        });
        allowedCategories.forEach(cat => {
          if (!finalData.find(d => d.name === cat)) finalData.push({ name: cat, value: 0 });
        });
        if (otherTotal > 0) finalData.push({ name: "Other Supplies", value: otherTotal });
        // If all values are 0, use dummy data anyway
        const hasRealData = finalData.some(d => d.value > 0);
        setDonationCategorie(hasRealData ? finalData : DUMMY_DONATION_CATEGORIES);
      })
      .catch(err => {
        console.log("Using dummy categories:", err.message);
        setDonationCategorie(DUMMY_DONATION_CATEGORIES);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3200/recent-donations")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setDonations(data);
        } else {
          setDonations(DUMMY_DONATIONS);
        }
      })
      .catch(err => {
        console.log("Using dummy donations:", err.message);
        setDonations(DUMMY_DONATIONS);
      });
  }, []);

  // Rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % DUMMY_TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ background: "var(--hc-surface-alt)", minHeight: "100vh" }}>
        <div className="container py-5">

          {/* Header */}
          <div className="mb-5 animate-fade-in-up">
            <div className="d-flex align-items-center gap-2 mb-2">
              <TrendingUp size={28} style={{ color: "var(--hc-primary)" }} />
              <h1 className="fw-bold mb-0" style={{ fontFamily: "var(--hc-font-heading)", color: "var(--hc-navy)" }}>
                Impact Dashboard
              </h1>
            </div>
            <p style={{ color: "var(--hc-text-muted)", fontSize: "1.05rem" }}>
              Tracking the distribution of essential supplies in real time.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="row g-4 mb-5">
            {statCards.map((stat, idx) => (
              <div key={idx} className="col-md-6 col-lg-3"
                style={{ animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both` }}>
                <div className="impact-stat-card h-100">
                  <div className="d-flex align-items-center gap-3">
                    <div style={{
                      width: 52, height: 52, borderRadius: 14,
                      background: stat.bg, color: stat.color,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      {stat.icon}
                    </div>
                    <div>
                      <div style={{
                        fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase",
                        letterSpacing: "0.5px", color: "var(--hc-text-muted)", marginBottom: 2
                      }}>
                        {stat.label}
                      </div>
                      <div style={{
                        fontFamily: "var(--hc-font-heading)", fontWeight: 900,
                        fontSize: "1.7rem", color: "var(--hc-navy)", lineHeight: 1
                      }}>
                        {stat.value}
                      </div>
                      <div style={{ color: "var(--hc-text-muted)", fontSize: "0.78rem" }}>{stat.sub}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts + Recent */}
          <div className="row g-4 mb-5">
            <div className="col-lg-7 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="premium-card p-4 h-100">
                <h5 className="fw-bold mb-4" style={{ fontFamily: "var(--hc-font-heading)", color: "var(--hc-navy)" }}>
                  Supplies by Category
                </h5>
                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={donationCategorie}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--hc-border-light)" />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--hc-text-muted)" }} />
                      <YAxis tick={{ fontSize: 12, fill: "var(--hc-text-muted)" }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {donationCategorie.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-lg-5 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="premium-card p-4 h-100">
                <h5 className="fw-bold mb-4" style={{ fontFamily: "var(--hc-font-heading)", color: "var(--hc-navy)" }}>
                  Recent Donations
                </h5>
                <div style={{ maxHeight: 320, overflowY: "auto" }}>
                  {donations.length === 0 ? (
                    <div className="text-center py-4">
                      <p style={{ color: "var(--hc-text-muted)" }}>No donations yet</p>
                    </div>
                  ) : (
                    donations.map((d, index) => (
                      <div key={index} className="donation-timeline-item"
                        style={{ animation: `fadeInUp 0.4s ease-out ${index * 0.08}s both` }}>
                        <div>
                          <span className="fw-semibold" style={{ color: "var(--hc-navy)" }}>{d.name}</span>
                          <span style={{ color: "var(--hc-text-secondary)" }}> donated </span>
                          <span className="fw-semibold" style={{ color: "var(--hc-primary)" }}>{d.quan} {d.quantity}</span>
                        </div>
                        <small style={{ color: "var(--hc-text-muted)" }}>
                          {new Date(d.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </small>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Success Story — rotating testimonials */}
          <div className="testimonial-card animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="position-relative text-center" style={{ zIndex: 1 }}>
              <div className="d-inline-flex align-items-center gap-2 px-3 py-2 mb-4"
                style={{
                  background: "rgba(255,255,255,0.1)", borderRadius: "var(--hc-radius-full)",
                  fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.7)"
                }}>
                ✨ Real Story
              </div>
              <h3 className="fw-bold mb-3" style={{ fontFamily: "var(--hc-font-heading)" }}>A Story of Hope</h3>
              <p className="lead fst-italic mb-4" style={{ color: "rgba(255,255,255,0.8)", maxWidth: 600, margin: "0 auto", lineHeight: 1.8, minHeight: "80px", transition: "opacity 0.5s ease" }}>
                "{DUMMY_TESTIMONIALS[activeTestimonial].quote}"
              </p>
              <div style={{ color: "var(--hc-primary-light)", fontWeight: 700 }}>
                — {DUMMY_TESTIMONIALS[activeTestimonial].author}, {DUMMY_TESTIMONIALS[activeTestimonial].role}
              </div>
              {/* Dots */}
              <div className="d-flex justify-content-center gap-2 mt-3">
                {DUMMY_TESTIMONIALS.map((_, i) => (
                  <div key={i} onClick={() => setActiveTestimonial(i)}
                    style={{
                      width: i === activeTestimonial ? 24 : 8, height: 8,
                      borderRadius: 4, cursor: "pointer",
                      background: i === activeTestimonial ? "var(--hc-primary-light)" : "rgba(255,255,255,0.3)",
                      transition: "all 0.3s ease"
                    }} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default ImpactPage;