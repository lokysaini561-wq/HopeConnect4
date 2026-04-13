import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRight, ShieldCheck, Users, MapPin, Heart, TrendingUp, Sparkles } from "lucide-react";
import "./App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  const [hover, setHover] = useState(false);

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