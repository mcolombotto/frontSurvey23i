import React, {useContext, useState} from 'react';
import UserContext from '../context/UserContext'
import './Navigation.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Logo from "../logo/Logo";

function Navigation()  {
    const context = useContext(UserContext);
    const urlImg = context.user.img;
    const usernameNew = context.user.username;
    //const [userLogin, setUserLogin] = React.useState(false);
    console.log('context Navegation', context, context.user.username, context.user.img);
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
                            <Link className="nav-link" to="/register">Registrate</Link>
                            <div className='w-75 d-flex flex-direccion-row'>
                                <p className='text-white pt-2 me-2 ms-1'>{`Bienvenido ${usernameNew}`}</p>
                                <div className='w-25'>
                                        <img src={urlImg} alt={`usuario registrado ${usernameNew}`} className='img-fluid rounded-circle' />
                                </div>
                               
                           </div>
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

