import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Mail, Package, Calendar, User } from "lucide-react";
import N from "./N";
import Footers from "./Footers";
import "../App.css";

function Donate() {
  const { id } = useParams();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3200/donations/${id}`)
      .then(res => res.json())
      .then(data => { setDonations(Array.isArray(data) ? data : []); })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <>
      <N />
      <div style={{ background: "var(--hc-surface-alt)", minHeight: "100vh" }}>
        <div className="container py-4">
          <div className="premium-card animate-fade-in-up">
            <div className="p-4">

              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold mb-1" style={{ fontFamily: "var(--hc-font-heading)", color: "var(--hc-navy)" }}>
                    Donation History
                  </h4>
                  <p className="mb-0" style={{ color: "var(--hc-text-muted)", fontSize: "0.88rem" }}>
                    Track all donations received for this orphanage
                  </p>
                </div>
                <span className="px-3 py-2" style={{
                  background: "rgba(34,197,94,0.1)", color: "#16a34a",
                  borderRadius: "var(--hc-radius-full)", fontWeight: 700, fontSize: "0.85rem"
                }}>
                  {donations.length} Donations
                </span>
              </div>

              {/* Empty State */}
              {donations.length === 0 ? (
                <div className="empty-state py-5">
                  <div className="empty-state-icon">
                    <Package size={32} style={{ color: "var(--hc-text-muted)" }} />
                  </div>
                  <h5 className="fw-bold" style={{ color: "var(--hc-navy)" }}>No donations yet</h5>
                  <p style={{ color: "var(--hc-text-muted)" }}>Donations will appear here once donors contribute.</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {donations.map((d, index) => (
                    <div key={index} className="donation-timeline-item"
                      style={{ animation: `fadeInUp 0.4s ease-out ${index * 0.08}s both` }}>
                      <div className="d-flex justify-content-between align-items-start">
                        {/* Left */}
                        <div>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <div style={{
                              width: 36, height: 36, borderRadius: 10,
                              background: "var(--hc-gradient-primary)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: "#fff", fontWeight: 700, fontSize: "0.85rem"
                            }}>
                              {d.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h6 className="fw-bold mb-0" style={{ color: "var(--hc-navy)", fontSize: "0.95rem" }}>
                                {d.name}
                              </h6>
                            </div>
                          </div>

                          <div className="mb-2">
                            <span style={{ color: "var(--hc-text-secondary)", fontSize: "0.88rem" }}>Donated </span>
                            <span className="px-2 py-1" style={{
                              background: "rgba(59,130,246,0.1)", color: "#3b82f6",
                              borderRadius: 6, fontWeight: 600, fontSize: "0.85rem"
                            }}>
                              {d.quan} {d.quantity}
                            </span>
                          </div>

                          {d.donationtype && (
                            <span className="px-2 py-1 me-2" style={{
                              background: "rgba(13,148,136,0.08)", color: "var(--hc-primary)",
                              borderRadius: 6, fontWeight: 600, fontSize: "0.78rem"
                            }}>
                              {d.donationtype}
                            </span>
                          )}

                          {d.userEmail && (
                            <div className="mt-2 d-flex align-items-center gap-1">
                              <Mail size={14} style={{ color: "var(--hc-text-muted)" }} />
                              <small style={{ color: "var(--hc-text-muted)" }}>{d.userEmail}</small>
                            </div>
                          )}
                        </div>

                        {/* Date */}
                        <div className="text-end d-flex align-items-center gap-1" style={{ flexShrink: 0 }}>
                          <Calendar size={14} style={{ color: "var(--hc-text-muted)" }} />
                          <small style={{ color: "var(--hc-text-muted)", fontWeight: 500 }}>
                            {d.createdAt && new Date(d.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric"
                            })}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footers />
    </>
  );
}

export default Donate;