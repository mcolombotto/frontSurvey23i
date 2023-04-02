import React from 'react';
import './Navigation.css'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../logo/Logo";

const Navigation = ({ loggedUser, setLoggedUser }) => {
    const navigate = useNavigate();
  
    const logout = ()=>{
      localStorage.removeItem("user-token");
      setLoggedUser({})
      navigate("/");
    };

    return (
        <Navbar className='menu' variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>
                    <Logo/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <div className='cantainer-link-nav ms-auto'>
                        <Nav>
                            <Link className="nav-link" to="/">Home</Link>
                            <Link className="nav-link" to="/auth/register">Regístrate</Link>
                            {loggedUser.token ? (
                                <>
                                    <Button variant="dark" onClick={logout}>Log out</Button>
                                    <Link className="nav-link" to="/survey/table">
                                        Manage Surveys
                                    </Link>
                                </>
                            ) : (
                                <Link className="nav-link" to="/auth/login">
                                    Login
                                </Link>
                            )}
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
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default Navigation;