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
  /* const { img: urlImg, username, estate: loggedUser } = context.user; */

  
  
    const username = JSON.parse(localStorage.getItem("user-token"))?.username ;
  

  const handleLogout = () => {
    /* context.setUser({}); */
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
            <Link className="nav-link" to="/">
              Home
            </Link>
            <NavDropdown title="Plantillas" id="nav-dropdown">
              <NavDropdown.Item to="*">Estudios de mercado</NavDropdown.Item>
              <NavDropdown.Item to="*">Evaluación de eventos</NavDropdown.Item>
              <NavDropdown.Item to="*">
                Evaluación del profesor
              </NavDropdown.Item>
            </NavDropdown>
            {!loggedUser && (
              <>
                <Link className="nav-link" to="/register">
                  Registrate
                </Link>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </>
            )}
            {loggedUser && (
              <Dropdown className="d-inline">
                <Dropdown.Toggle
                  id="dropdown-autoclose-true"
                  className="btn btn-dark p-1"
                >
                  <span>{username}</span>
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

                <Dropdown.Menu>
                  <NavDropdown.Item as="button" onClick={handleLogout}>
                    Cerrar sesion
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
