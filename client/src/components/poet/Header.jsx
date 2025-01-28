import { Navbar, Nav, NavLink } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Navbar expand="lg" className="header-navbar px-4 py-3 shadow-sm">
      <Navbar.Brand as={Link} to="/" className="header-logo">
        Poetry Review App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <NavLink
            as={Link}
            to="register"
            className="register header-register-link"
          >
            Create Poetry
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
