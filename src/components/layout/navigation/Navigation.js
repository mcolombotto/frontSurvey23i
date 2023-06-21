import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import "./Navigation.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import Logo from "../logo/Logo";

function Navigation({ loggedUser, setLoggedUser }) {
  const context = useContext(UserContext);
  const username = JSON.parse(localStorage.getItem("user-token"))?.username;
  const handleLogout = () => {
    localStorage.removeItem("user-token");
    setLoggedUser(false);
  };

  return (
    <Navbar className="menu" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link fs-5" to="/">
              Inicio
            </Link>
            <Link className="nav-link fs-5" to="/us">
              Nosotros
            </Link>
            <Link className="nav-link fs-5" to="/contact">
              Contacto
            </Link>
            {!loggedUser && (
              <>
                <Link className="nav-link fs-5" to="/register">
                  Regístrate
                </Link>
                <Link className="nav-link fs-5" to="/login">
                  Ingresar
                </Link>
              </>
            )}
            {loggedUser && (
              <Dropdown >
                <Dropdown.Toggle
                  id="dropdown-autoclose-true" 
                  variant="outline-secondary"
                >
                  <span className="fs-5 ">{username}</span>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUJt3kjJp8q750SzS-kr7cMITugGpEh-Vdq0NeWS4&s"
                    alt={`usuario registrado ${username}`}
                    className="img-fluid rounded-circle"
                    style={{
                      width: "30px",
                      margin: "0 10px",
                    }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                  <Link
                    className="text-decoration-none text-dark"
                    to="/survey/table"
                  >
                    <NavDropdown.Item as="button">Panel</NavDropdown.Item>
                  </Link>

                  <Dropdown.Divider />
                  <NavDropdown.Item as="button" onClick={handleLogout}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
