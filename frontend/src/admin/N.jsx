import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Heart, LayoutDashboard, Building2, LogOut } from "lucide-react";

function N() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  function handleLogout() {
    fetch("http://localhost:3200/logout", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.message);
        navigate("/login");
      });
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" fixed="top" className="admin-navbar">
        <Container fluid className="px-4">
          <div className="d-flex align-items-center gap-2">
            <div className="brand-logo" style={{ width: 36, height: 36, borderRadius: 10 }}>
              <Heart size={16} fill="currentColor" />
            </div>
            <Navbar.Brand as={Link} to="/orphanage" style={{ fontFamily: "var(--hc-font-heading)", fontWeight: 800, fontSize: "1.15rem" }}>
              HopeConnect
            </Navbar.Brand>
            <span className="px-2 py-1" style={{
              background: "rgba(13,148,136,0.2)", color: "var(--hc-primary-light)",
              borderRadius: "6px", fontSize: "0.65rem", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.5px"
            }}>
              Admin
            </span>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto gap-1">
              <Nav.Link as={Link} to="/orphanage"
                className={isActive("/orphanage") ? "active" : ""}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <LayoutDashboard size={16} /> Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/orphanage"
                className={isActive("/orphanage") ? "active" : ""}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Building2 size={16} /> Orphanage
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