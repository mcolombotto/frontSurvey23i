import React from 'react';
import './Navigation.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../../../assets/img/logo-WS.png';
import { Link } from 'react-router-dom';


function Navigation()  {
    return (
        <Navbar className='menu' variant="dark" expand="lg">
            <Container>
                <Navbar.Brand className='Container-logo d-flex' href="#home">
                    <img className='img-fluid' src={ Logo } alt="Logo de la empresa WorldSurveys"/>
                    <div className='logo pt-4 ps-1 pe-2 ms-2'>
                        WorldSurveys
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/contact">Contacto</Link>
                        <NavDropdown title="Plantillas" id="nav-dropdown">
                            <NavDropdown.Item to="/Plantillas/EstudiosDeMercado">Estudios de mercado</NavDropdown.Item>
                            <NavDropdown.Item to="/Plantillas/EvaluacionDeEventos">
                               Evaluación de eventos
                            </NavDropdown.Item>
                            <NavDropdown.Item to="/Plantillas/EncuestasDeClimaLaboral">Encuestas de clima laboral</NavDropdown.Item>
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

