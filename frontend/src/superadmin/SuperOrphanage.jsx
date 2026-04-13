import { useState, useRef, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { Upload, Plus, Eye } from "lucide-react";
import Swal from "sweetalert2";
import N from "./N";
import Footers from "./Footers";
import "../App.css";

function SuperOrphanage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [child, setChild] = useState("");
  const [year, setYear] = useState("");
  const [address, setAddress] = useState("");
  const [des, setDes] = useState("");
  const [history, setHistory] = useState("");
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);
  const [ids, setId] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [urgentNeeds, setUrgentNeeds] = useState([{ item: "", quantity: "", urgency: "" }]);

  const Toast = Swal.mixin({ toast: true, position: "top-end", showConfirmButton: false, timer: 3000, timerProgressBar: true });

  const handleUrgentChange = (index, e) => {
    const values = [...urgentNeeds];
    values[index][e.target.name] = e.target.value;
    setUrgentNeeds(values);
  };

  const addUrgentField = () => {
    setUrgentNeeds([...urgentNeeds, { item: "", quantity: "", urgency: "" }]);
  };

  const fileRef = useRef();

  const loadData = () => {
    fetch("http://localhost:3200/all-orphanage", { credentials: "include" })
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.log(err));
  };

  useEffect(() => { loadData(); }, []);

  const insert = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name); formData.append("email", email);
    formData.append("phone", phone); formData.append("location", location);
    formData.append("children", child); formData.append("fyear", year);
    formData.append("address", address); formData.append("des", des);
    formData.append("history", history); formData.append("photo", image);
    formData.append("urgentNeeds", JSON.stringify(urgentNeeds));
    const res = await fetch("http://localhost:3200/orphanage", { method: "POST", credentials: "include", body: formData });
    const data = await res.json();
    if (data.success) {
      Toast.fire({ icon: "success", title: "Orphanage Added Successfully" });
      loadData();
      setName(""); setEmail(""); setPhone(""); setLocation("");
      setChild(""); setYear(""); setAddress(""); setDes(""); setHistory("");
      setImage(null); fileRef.current.value = "";
      setUrgentNeeds([{ item: "", quantity: "", urgency: "" }]);
    } else { alert("Error Adding Data"); }
  };

  const deleteData = (id) => {
    Swal.fire({
      title: 'Are you sure?', text: "This orphanage will be permanently deleted.",
      icon: 'warning', showCancelButton: true,
      confirmButtonColor: '#ef4444', cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
      customClass: { popup: 'premium-modal' }
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3200/orphdelete/${id}`, { method: "DELETE" })
          .then(res => res.json())
          .then(result => {
            if (result.success) Toast.fire({ icon: "success", title: "Orphanage Deleted" });
            loadData();
          }).catch(err => console.log(err));
      }
    });
  };

  function orphedit(id) {
    fetch(`http://localhost:3200/orphedit/${id}`)
      .then(res => res.json())
      .then(data => {
        setName(data.result.name); setEmail(data.result.email);
        setPhone(data.result.phone); setLocation(data.result.location);
        setChild(data.result.children); setYear(data.result.fyear);
        setAddress(data.result.address); setHistory(data.result.history);
        setDes(data.result.des);
        setPreview(`http://localhost:3200/uploads/${data.result.photo}`);
        setId(id);
        setUrgentNeeds(data.result.urgentNeeds?.length > 0 ? data.result.urgentNeeds : [{ item: "", quantity: "", urgency: "" }]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }).catch(err => console.log(err));
  }

  const update = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name); formData.append("email", email);
    formData.append("phone", phone); formData.append("location", location);
    formData.append("children", child); formData.append("fyear", year);
    formData.append("address", address); formData.append("des", des);
    formData.append("history", history);
    if (image) formData.append("photo", image);
    formData.append("urgentNeeds", JSON.stringify(urgentNeeds));
    const res = await fetch(`http://localhost:3200/orphupdate/${ids}`, { method: "PUT", credentials: "include", body: formData });
    const data = await res.json();
    if (data.success) {
      Toast.fire({ icon: "success", title: "Orphanage Updated Successfully" });
      loadData();
      setName(""); setEmail(""); setPhone(""); setLocation("");
      setChild(""); setYear(""); setAddress(""); setDes(""); setHistory("");
      setImage(null); fileRef.current.value = "";
      setUrgentNeeds([{ item: "", quantity: "", urgency: "" }]);
      setId(0); setPreview("");
    } else { alert("Error Updating Data"); }
  };

  useEffect(() => {
    fetch("http://localhost:3200/check-admin", { credentials: "include" })
      .then(res => { if (res.status === 401) { navigate("/admin"); return null; } return res.json(); })
      .then(data => { if (data && !data.loggedIn) navigate("/admin"); })
      .catch(() => navigate("/admin"));
  }, []);

  return (
    <>
      <N />
      <div style={{ background: "var(--hc-surface-alt)", minHeight: "100vh" }}>
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-10">

              {/* Form Card */}
              <div className="premium-card animate-fade-in-up">
                <div className="p-4">
                  <div className="section-heading" style={{ marginBottom: 24 }}>
                    <h2 style={{ fontSize: "1.6rem" }}>{ids ? "Update Orphanage" : "Add Orphanage"}</h2>
                  </div>

                  <form onSubmit={insert} className="premium-form">
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Orphanage Name</label>
                        <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} className="premium-input form-control" required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="premium-input form-control" required />
                      </div>
                    </div>
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input type="text" placeholder="+91 XXXXX XXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} className="premium-input form-control" required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Location</label>
                        <input type="text" placeholder="City, State" value={location} onChange={(e) => setLocation(e.target.value)} className="premium-input form-control" required />
                      </div>
                    </div>
                    <div className="row g-3 mb-3">
                      <div className="col-md-4">
                        <label className="form-label">Children Count</label>
                        <input type="number" placeholder="e.g. 50" value={child} onChange={(e) => setChild(e.target.value)} className="premium-input form-control" required />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Founded Year</label>
                        <input type="number" placeholder="e.g. 2010" value={year} onChange={(e) => setYear(e.target.value)} className="premium-input form-control" />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Address</label>
                        <input type="text" placeholder="Full address" value={address} onChange={(e) => setAddress(e.target.value)} className="premium-input form-control" />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea placeholder="Describe the orphanage..." value={des} onChange={(e) => setDes(e.target.value)} className="premium-input form-control" rows="3" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">History</label>
                      <input type="text" placeholder="Brief history..." value={history} onChange={(e) => setHistory(e.target.value)} className="premium-input form-control" />
                    </div>

                    {/* Urgent Needs */}
                    <div className="mt-4 mb-3">
                      <h6 className="fw-bold d-flex align-items-center gap-2" style={{ color: "var(--hc-danger)" }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--hc-danger)", display: "inline-block", animation: "dotPulse 1.5s infinite" }}></span>
                        Urgent Needs
                      </h6>
                    </div>
                    {urgentNeeds.map((need, index) => (
                      <div className="row g-3 mb-3" key={index} style={{ animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both` }}>
                        <div className="col-md-4">
                          <input type="text" name="item" placeholder="Item (e.g. Blankets)" className="premium-input form-control" value={need.item} onChange={(e) => handleUrgentChange(index, e)} />
                        </div>
                        <div className="col-md-4">
                          <input type="text" name="quantity" placeholder="Qty (e.g. 50 pcs)" className="premium-input form-control" value={need.quantity} onChange={(e) => handleUrgentChange(index, e)} />
                        </div>
                        <div className="col-md-4">
                          <select name="urgency" className="premium-input form-select" value={need.urgency} onChange={(e) => handleUrgentChange(index, e)}>
                            <option value="">Select Urgency</option>
                            <option value="High">🔴 High</option>
                            <option value="Medium">🟡 Medium</option>
                            <option value="Low">🟢 Low</option>
                          </select>
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={addUrgentField}
                      className="btn mb-3 d-flex align-items-center gap-2"
                      style={{ background: "var(--hc-surface-alt)", color: "var(--hc-text-secondary)", fontWeight: 600, borderRadius: "var(--hc-radius)", border: "1px dashed var(--hc-border)", padding: "8px 16px", fontSize: "0.85rem" }}>
                      <Plus size={16} /> Add More Needs
                    </button>

                    {preview && (
                      <div className="mb-3 d-flex align-items-center gap-3">
                        <img src={preview} alt="preview" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: "var(--hc-radius)" }} />
                        <span className="small" style={{ color: "var(--hc-text-muted)" }}>Current image</span>
                      </div>
                    )}

                    <div className="mb-4">
                      <label className="form-label">Upload Image</label>
                      <input type="file" name="photo" ref={fileRef} onChange={(e) => setImage(e.target.files[0])} className="premium-input form-control" required={!ids} />
                    </div>

                    <div className="d-grid">
                      {ids ? (
                        <button onClick={update} className="gradient-btn" type="button"
                          style={{ padding: "14px", borderRadius: "var(--hc-radius)", background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                          Update Orphanage
                        </button>
                      ) : (
                        <button type="submit" className="gradient-btn" style={{ padding: "14px", borderRadius: "var(--hc-radius)" }}>
                          Add Orphanage
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Records Table */}
              <div className="section-heading mt-5" style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: "1.6rem" }}>All Orphanage Records</h2>
              </div>

              {data.length === 0 ? (
                <div className="empty-state animate-fade-in">
                  <div className="empty-state-icon">
                    <Eye size={32} style={{ color: "var(--hc-text-muted)" }} />
                  </div>
                  <h5 className="fw-bold" style={{ color: "var(--hc-navy)" }}>No orphanages yet</h5>
                  <p style={{ color: "var(--hc-text-muted)" }}>Add your first orphanage using the form above.</p>
                </div>
              ) : (
                <div className="table-responsive animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  <table className="premium-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Children</th>
                        <th>Founded</th>
                        <th>Admin</th>
                        <th>Actions</th>
                        <th>Donations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index} style={{ animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both` }}>
                          <td className="fw-semibold">{index + 1}</td>
                          <td>
                            <img src={`http://localhost:3200/uploads/${item.photo}`} alt="orphanage"
                              style={{ width: 60, height: 45, objectFit: "cover", borderRadius: 8 }} />
                          </td>
                          <td className="fw-semibold" style={{ color: "var(--hc-navy)" }}>{item.name}</td>
                          <td style={{ color: "var(--hc-text-secondary)", fontSize: "0.85rem" }}>{item.email}</td>
                          <td style={{ fontSize: "0.85rem" }}>{item.phone}</td>
                          <td style={{ fontSize: "0.85rem" }}>{item.location}</td>
                          <td>
                            <span className="px-2 py-1" style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a", borderRadius: 6, fontWeight: 600, fontSize: "0.85rem" }}>
                              {item.children}
                            </span>
                          </td>
                          <td style={{ fontSize: "0.85rem" }}>{item.fyear}</td>
                          <td>
                            <span className="px-2 py-1" style={{
                              background: "rgba(139,92,246,0.08)", color: "#7c3aed",
                              borderRadius: 6, fontWeight: 600, fontSize: "0.75rem"
                            }}>
                              {item.user || "N/A"}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button className="action-btn action-btn-edit" onClick={() => orphedit(item._id)} title="Edit">
                                <FaEdit size={14} />
                              </button>
                              <button className="action-btn action-btn-delete" onClick={() => deleteData(item._id)} title="Delete">
                                <FaTrash size={14} />
                              </button>
                            </div>
                          </td>
                          <td>
                            <button className="gradient-btn" onClick={() => navigate(`/donatesuper/${item._id}`)}
                              style={{ padding: "6px 14px", fontSize: "0.78rem", borderRadius: 8 }}>
                              <Eye size={14} className="me-1" /> View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default SuperOrphanage;
