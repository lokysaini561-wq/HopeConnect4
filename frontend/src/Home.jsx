import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRight, ShieldCheck, Users, MapPin, Heart, TrendingUp, Sparkles, ChevronRight, Clock } from "lucide-react";
import "./App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { DUMMY_ORPHANAGES, DUMMY_DONATIONS, DUMMY_TESTIMONIALS, ORPHANAGE_IMAGES } from "./dummyData";

const Home = () => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  // Animated counter
  const useCounter = (target, duration = 2000) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) { setCount(target); clearInterval(timer); }
        else setCount(Math.floor(start));
      }, 16);
      return () => clearInterval(timer);
    }, [target, duration]);
    return count;
  };

  const orphanagesCount = useCounter(50);
  const childrenCount = useCounter(1200);
  const donationsCount = useCounter(3500);

  // Featured orphanages (first 3)
  const featured = DUMMY_ORPHANAGES.slice(0, 3);
  // Recent donations (first 5)
  const recentDonations = DUMMY_DONATIONS.slice(0, 5);

  return (
    <>
      <Navbar />
      <div className="d-flex flex-column">

        {/* ===== HERO SECTION ===== */}
        <section className="hero-section">
          <div className="hero-bg">
            <img src="https://images.unsplash.com/photo-1706645740995-d3ab4b91f4fa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Happy children" />
          </div>
          <div className="hero-overlay"></div>

          <Container className="hero-content">
            <Row>
              <Col lg={8}>
                <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  <span className="d-inline-flex align-items-center gap-2 px-3 py-2 mb-4"
                    style={{
                      background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)",
                      borderRadius: "var(--hc-radius-full)", color: "rgba(255,255,255,0.9)",
                      fontSize: "0.85rem", fontWeight: 500, border: "1px solid rgba(255,255,255,0.15)"
                    }}>
                    <Sparkles size={14} /> Trusted by 50+ Orphanages
                  </span>
                </div>

                <h1 className="hero-title mb-4">
                  Share a Little, <br />
                  <span className="highlight">Change a Life Forever</span>
                </h1>

                <p className="hero-subtitle mb-5">
                  Connect directly with local orphanages. Your donation of food,
                  clothes, or essential supplies can bring a smile to a child's face today.
                </p>

                <div className="d-flex flex-column flex-sm-row gap-3 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  <Link to="/location" className="gradient-btn d-inline-flex align-items-center gap-2 text-decoration-none"
                    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    Start Donating <ArrowRight size={18} style={{ transform: hover ? "translateX(4px)" : "translateX(0)", transition: "transform 0.3s" }} />
                  </Link>

                  <Link to="/impact"
                    className="d-inline-flex align-items-center gap-2 text-decoration-none"
                    style={{
                      padding: "14px 36px", borderRadius: "var(--hc-radius-full)", fontWeight: 700,
                      color: "#fff", border: "2px solid rgba(255,255,255,0.3)",
                      transition: "var(--hc-transition)", fontSize: "1rem"
                    }}>
                    See Our Impact
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ===== STATS COUNTER ===== */}
        <section style={{ marginTop: "-60px", position: "relative", zIndex: 10 }}>
          <Container>
            <div className="glass-card p-4" style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)" }}>
              <Row className="text-center">
                {[
                  { icon: <MapPin size={24} />, value: orphanagesCount + "+", label: "Orphanages", color: "#0d9488" },
                  { icon: <Users size={24} />, value: childrenCount.toLocaleString() + "+", label: "Children Helped", color: "#f59e0b" },
                  { icon: <Heart size={24} />, value: donationsCount.toLocaleString() + "+", label: "Donations Made", color: "#ef4444" },
                  { icon: <TrendingUp size={24} />, value: "98%", label: "Satisfaction Rate", color: "#3b82f6" },
                ].map((stat, i) => (
                  <Col xs={6} md={3} key={i} className={`animate-fade-in-up-delay-${i + 1}`}>
                    <div className="py-3">
                      <div className="d-inline-flex align-items-center justify-content-center mb-2"
                        style={{ width: 48, height: 48, borderRadius: 14, background: `${stat.color}12`, color: stat.color }}>
                        {stat.icon}
                      </div>
                      <div style={{ fontFamily: "var(--hc-font-heading)", fontSize: "2rem", fontWeight: 900, color: "var(--hc-navy)" }}>
                        {stat.value}
                      </div>
                      <div style={{ color: "var(--hc-text-muted)", fontSize: "0.85rem", fontWeight: 500 }}>{stat.label}</div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Container>
        </section>

        {/* ===== WHY DONATE ===== */}
        <section className="py-5" style={{ background: "var(--hc-surface-alt)" }}>
          <Container className="py-4">
            <div className="section-heading">
              <h2>Why Donate Through HopeConnect?</h2>
              <p>We ensure transparency, safety, and direct impact with every contribution.</p>
            </div>

            <Row className="g-4">
              {[
                {
                  icon: <MapPin size={36} />,
                  title: "Location Based",
                  desc: "Find orphanages in your own neighborhood. Support the community around you.",
                  iconBg: "rgba(13,148,136,0.1)", iconColor: "#0d9488"
                },
                {
                  icon: <ShieldCheck size={36} />,
                  title: "Verified Centers",
                  desc: "Every orphanage listed is verified for safety, hygiene, and genuine needs.",
                  iconBg: "rgba(245,158,11,0.1)", iconColor: "#f59e0b"
                },
                {
                  icon: <Users size={36} />,
                  title: "Direct Connection",
                  desc: "Contact orphanages directly. No middlemen, ensuring 100% of your help reaches them.",
                  iconBg: "rgba(59,130,246,0.1)", iconColor: "#3b82f6"
                }
              ].map((card, i) => (
                <Col md={4} key={i}>
                  <div className={`feature-card h-100 animate-fade-in-up-delay-${i + 1}`}>
                    <div className="icon-circle mb-3"
                      style={{ background: card.iconBg, color: card.iconColor }}>
                      {card.icon}
                    </div>
                    <h5 className="fw-bold mb-2" style={{ fontFamily: "var(--hc-font-heading)" }}>{card.title}</h5>
                    <p style={{ color: "var(--hc-text-secondary)", fontSize: "0.95rem", lineHeight: 1.7 }}>{card.desc}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* ===== FEATURED ORPHANAGES ===== */}
        <section className="py-5">
          <Container className="py-4">
            <div className="section-heading">
              <h2>Featured Orphanages</h2>
              <p>These verified centers are actively seeking donations and support.</p>
            </div>

            <Row className="g-4">
              {featured.map((item, index) => (
                <Col md={4} key={item._id}>
                  <div className="orphanage-card h-100 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.15}s`, cursor: "pointer" }}
                    onClick={() => navigate(`/view/${item._id}`)}>

                    <div className="card-img-wrapper">
                      <img src={ORPHANAGE_IMAGES[index]} alt={item.name} />
                      <div className="position-absolute top-0 end-0 m-3">
                        <span className="px-2 py-1 d-flex align-items-center gap-1"
                          style={{
                            background: "rgba(34,197,94,0.9)", color: "#fff",
                            borderRadius: "var(--hc-radius-full)", fontSize: "0.72rem",
                            fontWeight: 600, backdropFilter: "blur(4px)"
                          }}>
                          <ShieldCheck size={12} /> Verified
                        </span>
                      </div>
                    </div>

                    <div className="p-4 d-flex flex-column" style={{ flex: 1 }}>
                      <h5 className="fw-bold mb-2" style={{ fontFamily: "var(--hc-font-heading)", color: "var(--hc-navy)" }}>
                        {item.name}
                      </h5>
                      <p className="d-flex align-items-center gap-1 mb-2"
                        style={{ color: "var(--hc-text-muted)", fontSize: "0.85rem" }}>
                        <MapPin size={14} /> {item.location}
                      </p>

                      <div className="d-flex gap-2 mb-3">
                        <span className="d-inline-flex align-items-center gap-1 px-2 py-1"
                          style={{
                            background: "rgba(34,197,94,0.08)", borderRadius: "var(--hc-radius-full)",
                            fontSize: "0.78rem", color: "#16a34a", fontWeight: 600
                          }}>
                          <Users size={12} /> {item.children} Children
                        </span>
                        <span className="d-inline-flex align-items-center gap-1 px-2 py-1"
                          style={{
                            background: "rgba(59,130,246,0.08)", borderRadius: "var(--hc-radius-full)",
                            fontSize: "0.78rem", color: "#3b82f6", fontWeight: 600
                          }}>
                          <Clock size={12} /> Est. {item.fyear}
                        </span>
                      </div>

                      <p style={{ color: "var(--hc-text-secondary)", fontSize: "0.88rem", lineHeight: 1.7, flex: 1 }}>
                        {item.des?.slice(0, 110)}...
                      </p>

                      <div style={{ borderTop: "1px solid var(--hc-border-light)", paddingTop: 14, marginTop: 10 }}
                        className="d-flex justify-content-between align-items-center">
                        <div>
                          <small style={{ color: "var(--hc-text-muted)", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase" }}>
                            Urgent Need
                          </small>
                          <div className="badge-urgency-high" style={{ fontSize: "0.78rem" }}>
                            {item.urgentNeeds?.[0]?.item}
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center"
                          style={{
                            width: 36, height: 36, borderRadius: "50%",
                            background: "var(--hc-primary-subtle)", color: "var(--hc-primary)"
                          }}>
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            <div className="text-center mt-4">
              <Link to="/location" className="gradient-btn-dark d-inline-flex align-items-center gap-2 text-decoration-none"
                style={{ padding: "12px 32px" }}>
                View All Orphanages <ArrowRight size={16} />
              </Link>
            </div>
          </Container>
        </section>

        {/* ===== RECENT DONATIONS TICKER ===== */}
        <section className="py-5" style={{ background: "var(--hc-surface-alt)" }}>
          <Container className="py-2">
            <div className="section-heading">
              <h2>Recent Donations</h2>
              <p>See the latest contributions from generous donors like you.</p>
            </div>

            <Row className="g-3 justify-content-center">
              {recentDonations.map((d, i) => (
                <Col md={6} lg={4} key={i}>
                  <div className="premium-card p-3 h-100 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="d-flex align-items-center gap-3">
                      <div style={{
                        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                        background: d.donationtype === "Food" ? "rgba(34,197,94,0.1)" :
                          d.donationtype === "Clothes" ? "rgba(59,130,246,0.1)" :
                            d.donationtype === "Education" ? "rgba(245,158,11,0.1)" :
                              d.donationtype === "Shelter" ? "rgba(139,92,246,0.1)" : "rgba(100,116,139,0.1)",
                        color: d.donationtype === "Food" ? "#22c55e" :
                          d.donationtype === "Clothes" ? "#3b82f6" :
                            d.donationtype === "Education" ? "#f59e0b" :
                              d.donationtype === "Shelter" ? "#8b5cf6" : "#64748b",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 800, fontSize: "1.1rem"
                      }}>
                        {d.donationtype === "Food" ? "🍚" :
                          d.donationtype === "Clothes" ? "👕" :
                            d.donationtype === "Education" ? "📚" :
                              d.donationtype === "Shelter" ? "🏠" : "📦"}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.88rem" }}>
                          <span className="fw-semibold" style={{ color: "var(--hc-navy)" }}>{d.name}</span>
                          <span style={{ color: "var(--hc-text-muted)" }}> donated </span>
                          <span className="fw-semibold" style={{ color: "var(--hc-primary)" }}>{d.quan}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 mt-1">
                          <span style={{ fontSize: "0.75rem", color: "var(--hc-text-muted)" }}>
                            {d.quantity}
                          </span>
                          <span style={{ fontSize: "0.6rem", color: "var(--hc-text-muted)" }}>•</span>
                          <span style={{ fontSize: "0.75rem", color: "var(--hc-text-muted)" }}>
                            {new Date(d.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="py-5">
          <Container className="py-4">
            <div className="testimonial-card text-center">
              <h2 className="fw-bold mb-3" style={{ fontFamily: "var(--hc-font-heading)", fontSize: "2rem" }}>
                Ready to make a difference?
              </h2>
              <p className="mb-4" style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", maxWidth: 500, margin: "0 auto" }}>
                Every donation counts. Find an orphanage near you and start your journey of giving today.
              </p>
              <Link to="/location"
                className="gradient-btn d-inline-flex align-items-center gap-2 text-decoration-none"
                style={{ background: "linear-gradient(135deg, #14b8a6, #06b6d4)" }}>
                Find an Orphanage <ArrowRight size={18} />
              </Link>
            </div>
          </Container>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default Home;