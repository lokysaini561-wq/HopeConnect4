import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Shield, LayoutDashboard, Building2, MessageSquare, LogOut } from "lucide-react";

function N() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  function handleLogout() {
    fetch("http://localhost:3200/logoutadmin", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.message);
        navigate("/admin");
      });
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" fixed="top" className="admin-navbar">
        <Container fluid className="px-4">
          <div className="d-flex align-items-center gap-2">
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fff"
            }}>
              <Shield size={16} />
            </div>
            <Navbar.Brand as={Link} to="/allorphanage" style={{ fontFamily: "var(--hc-font-heading)", fontWeight: 800, fontSize: "1.15rem" }}>
              HopeConnect
            </Navbar.Brand>
            <span className="px-2 py-1" style={{
              background: "rgba(139,92,246,0.2)", color: "#a78bfa",
              borderRadius: "6px", fontSize: "0.65rem", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.5px"
            }}>
              Super Admin
            </span>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto gap-1">
              <Nav.Link as={Link} to="/allorphanage"
                className={isActive("/allorphanage") ? "active" : ""}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Building2 size={16} /> All Orphanages
              </Nav.Link>
              <Nav.Link as={Link} to="/contactview"
                className={isActive("/contactview") ? "active" : ""}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MessageSquare size={16} /> Contacts
              </Nav.Link>
              <Nav.Link onClick={handleLogout}
                style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <LogOut size={16} /> Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ height: "70px" }}></div>
    </>
  );
}

export default N;