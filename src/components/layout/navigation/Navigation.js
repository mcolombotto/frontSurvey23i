import React from 'react';
import './Navigation.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Logo from "../logo/Logo";


function Navigation()  {
    return (
        <Navbar className='menu' variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>
                    <Logo/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/register">Registrate</Link>
                        <NavDropdown title="Plantillas"  id="nav-dropdown">
                            <NavDropdown.Item to="/Plantillas/EstudiosDeMercado">Estudios de mercado</NavDropdown.Item>
                            <NavDropdown.Item to="/Plantillas/EvaluacionDeEventos">
                               Evaluación de eventos
                            </NavDropdown.Item>
                            <NavDropdown.Item to="/Plantillas/ EvaluaciónDelProfesor">
                                Evaluación del profesor
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;

