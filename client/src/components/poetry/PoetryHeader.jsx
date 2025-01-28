import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
const PoetryHeader = () => {
  const [poetName, setpoetName] = useState("");
  useEffect(() => {
    setpoetName(localStorage.getItem("PoetName"));
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };
  return (
    <Navbar
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      variant="dark"
      expand="lg"
      fixed="top"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Welcome {poetName} to Poetry App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="createPoetry">
              Create Poetry
            </Nav.Link>

            <Nav.Link as={Link} to="displayPoetry">
              Display Poetry
            </Nav.Link>
            <Nav.Link
              style={{ color: "red", cursor: "pointer" }}
              onClick={logout}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PoetryHeader;
