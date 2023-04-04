import React, { useContext } from 'react';
import UserContext from '../context/UserContext'
import './Navigation.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import Logo from "../logo/Logo";

function Navigation() {
    const context = useContext(UserContext);
    const { img: urlImg, username, estate: loggedUser } = context.user;
    return (
        <Navbar className='menu' variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>
                    <Logo />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className='ms-auto'>
                        <Link className="nav-link" to="/">Home</Link>
                        <NavDropdown title="Encuestas" id="nav-dropdown">
                            <NavDropdown.Item to="*">Clima laboral</NavDropdown.Item>
                            <NavDropdown.Item to="*">
                                Satisfacciòn de un servicio
                            </NavDropdown.Item>
                            <NavDropdown.Item to="*">
                                Investigaciòn
                            </NavDropdown.Item>
                        </NavDropdown>
                        {!loggedUser && (
                            <>
                                <Link className="nav-link" to="/register">Registrate</Link>
                                <Link className="nav-link" to="/login">Login</Link>
                            </>
                        )}
                        {loggedUser && (
                            <Dropdown className="d-inline mx-2">
                                <Dropdown.Toggle id="dropdown-autoclose-true" className="btn btn-dark">
                                    <span>{username}</span>
                                    <img
                                        src={urlImg}
                                        alt={`usuario registrado ${username}`}
                                        className='img-fluid rounded-circle'
                                        style={{
                                            width: '30px',
                                            margin: '0 10px'
                                        }}
                                    />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <NavDropdown.Item as="button" onClick={() => context.setUser({})}>
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
