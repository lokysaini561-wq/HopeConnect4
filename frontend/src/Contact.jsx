import Navbar from "./Navbar";
import Footer from "./Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";
import "./App.css";

function ContactPage() {
  const [name, setName] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const insert = async (e) => {
    const Toast = Swal.mixin({ toast: true, position: "top-end", showConfirmButton: false, timer: 3000, timerProgressBar: true });
    e.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:3200/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, last, email, message })
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      Toast.fire({ icon: "success", title: "Thank You for Contacting Us!" });
      setName(""); setLast(""); setEmail(""); setMessage("");
    } else {
      alert("Error Adding Data");
    }
  };

  const contactInfo = [
    { icon: <Mail size={20} />, title: "Email", primary: "khushikhada2003@gmail.com", secondary: null },
    { icon: <Phone size={20} />, title: "Phone", primary: "+91 95115 13496", secondary: "Mon-Fri from 9am to 6pm" },
    { icon: <MapPin size={20} />, title: "Office", primary: "Bikaner Technical University", secondary: "Karni Industrial Area" }
  ];

  return (
    <>
      <Navbar />
      <div style={{ background: "var(--hc-surface-alt)", minHeight: "100vh" }} className="py-5">
        <Container className="py-3">

          {/* Heading */}
          <div className="section-heading animate-fade-in-up">
            <h2>Get in Touch</h2>
            <p>Have questions? We're here to help you help others.</p>
          </div>

          <Row className="g-5">
            {/* Contact Info */}
            <Col md={5} className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="premium-card p-4 h-100">
                <h4 className="fw-bold mb-4" style={{ fontFamily: "var(--hc-font-heading)", color: "var(--hc-navy)" }}>
                  Contact Information
                </h4>
                <p className="small mb-4" style={{ color: "var(--hc-text-muted)" }}>
                  Reach out to us and we'll respond within 24 hours.
                </p>

                <div className="d-flex flex-column gap-2">
                  {contactInfo.map((item, i) => (
                    <div key={i} className="contact-info-item">
                      <div className="contact-info-icon">{item.icon}</div>
                      <div>
                        <h6 className="fw-bold mb-1" style={{ color: "var(--hc-navy)", fontSize: "0.9rem" }}>{item.title}</h6>
                        <p className="mb-0" style={{ color: "var(--hc-text-secondary)", fontSize: "0.88rem" }}>{item.primary}</p>
                        {item.secondary && (
                          <small style={{ color: "var(--hc-text-muted)" }}>{item.secondary}</small>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative */}
                <div className="mt-4 p-4 text-center"
                  style={{ background: "var(--hc-primary-subtle)", borderRadius: "var(--hc-radius-lg)" }}>
                  <p className="mb-0 fw-semibold" style={{ color: "var(--hc-primary-dark)", fontSize: "0.9rem" }}>
                    💬 We typically respond within 2-4 hours during business days.
                  </p>
                </div>
              </div>
            </Col>

            {/* Form */}
            <Col md={7} className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="premium-card p-4">
                <Form onSubmit={insert} className="premium-form">
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" className="premium-input" value={name}
                          onChange={(e) => setName(e.target.value)} placeholder="John" required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" className="premium-input" value={last}
                          onChange={(e) => setLast(e.target.value)} placeholder="Doe" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" className="premium-input" value={email}
                      onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" className="premium-input" value={message}
                      onChange={(e) => setMessage(e.target.value)} rows={5}
                      placeholder="How can we help you?" required />
                  </Form.Group>

                  <button type="submit" className="gradient-btn w-100 d-flex align-items-center justify-content-center gap-2"
                    disabled={loading} style={{ padding: "14px" }}>
                    {loading ? (
                      <span className="d-flex align-items-center gap-2">
                        <div className="spinner-border spinner-border-sm"></div> Sending...
                      </span>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;