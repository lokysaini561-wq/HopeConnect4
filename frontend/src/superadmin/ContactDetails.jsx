import { useEffect, useState } from "react";
import { MessageSquare, Mail, User, Calendar, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import N from './N';
import Footers from './Footers';
import "../App.css";

function ContactDetails() {
  const [data, setData] = useState([]);

  const loadData = () => {
    fetch("http://localhost:3200/all-contact")
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.log(err));
  };

  useEffect(() => { loadData(); }, []);

  const deleteData = (id) => {
    Swal.fire({
      title: 'Delete this message?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
      customClass: { popup: 'premium-modal' }
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3200/contactdel/${id}`, { method: "DELETE" })
          .then(res => res.json())
          .then(result => { loadData(); })
          .catch(err => console.log(err));
      }
    });
  };

  return (
    <>
      <N />
      <div style={{ background: "var(--hc-surface-alt)", minHeight: "100vh" }}>
        <div className="container py-4">

          {/* Header */}
          <div className="d-flex align-items-center gap-3 mb-4 animate-fade-in-up">
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: "rgba(139,92,246,0.1)", color: "#7c3aed",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="fw-bold mb-0" style={{ fontFamily: "var(--hc-font-heading)", color: "var(--hc-navy)" }}>
                Contact Messages
              </h3>
              <p className="mb-0" style={{ color: "var(--hc-text-muted)", fontSize: "0.88rem" }}>
                {data.length} messages received
              </p>
            </div>
          </div>

          {/* Empty State */}
          {data.length === 0 ? (
            <div className="empty-state animate-scale-in">
              <div className="empty-state-icon">
                <MessageSquare size={32} style={{ color: "var(--hc-text-muted)" }} />
              </div>
              <h5 className="fw-bold" style={{ color: "var(--hc-navy)" }}>No messages yet</h5>
              <p style={{ color: "var(--hc-text-muted)" }}>Contact messages will appear here.</p>
            </div>
          ) : (
            <div className="row g-4">
              {data.map((item, index) => (
                <div className="col-md-6 col-lg-4" key={item._id}
                  style={{ animation: `fadeInUp 0.4s ease-out ${index * 0.08}s both` }}>
                  <div className="premium-card p-4 h-100 d-flex flex-column">

                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center gap-3">
                        <div style={{
                          width: 42, height: 42, borderRadius: 12,
                          background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0
                        }}>
                          {item.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0" style={{ color: "var(--hc-navy)", fontSize: "0.95rem" }}>
                            {item.name} {item.last || ""}
                          </h6>
                          <div className="d-flex align-items-center gap-1 mt-1">
                            <Mail size={12} style={{ color: "var(--hc-text-muted)" }} />
                            <small style={{ color: "var(--hc-text-muted)", fontSize: "0.78rem" }}>{item.email}</small>
                          </div>
                        </div>
                      </div>
                      <button className="action-btn action-btn-delete" onClick={() => deleteData(item._id)} title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Message */}
                    <div className="flex-grow-1 p-3 mb-3" style={{
                      background: "var(--hc-surface-alt)", borderRadius: "var(--hc-radius)",
                      borderLeft: "3px solid rgba(139,92,246,0.3)"
                    }}>
                      <p className="mb-0" style={{ color: "var(--hc-text-secondary)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                        {item.message}
                      </p>
                    </div>

                    {/* Date */}
                    {item.createdAt && (
                      <div className="d-flex align-items-center gap-1">
                        <Calendar size={12} style={{ color: "var(--hc-text-muted)" }} />
                        <small style={{ color: "var(--hc-text-muted)", fontWeight: 500 }}>
                          {new Date(item.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric",
                            hour: "2-digit", minute: "2-digit"
                          })}
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footers />
    </>
  );
}

export default ContactDetails;
