import React, {useContext, useEffect} from 'react';
import UserContext from '../context/UserContext'
import './Navigation.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Logo from "../logo/Logo";
import { useNavigate } from 'react-router-dom';

function Navigation()  {
    const context = useContext(UserContext);
    const urlImg = context.user.img;
    const usernameNew = context.user.username;
    const userState = context.user.state;
    const linkRegister = !userState ? <Link className="nav-link" to="/register">Registrate</Link> : '';
    const linklogin = !userState ? <Link className="nav-link" to="/login">Login</Link> : '';
    const greet = userState ? <a className="aLink">{`${usernameNew}`}</a> : null;
    const navigate = useNavigate()
    //const [userLogin, setUserLogin] = React.useState(false);
    console.log('context Navegation', context, context.user.username, context.user.img);
    const showImg = userState ? <img src={urlImg} alt={`usuario registrado ${usernameNew}`} className='img-fluid rounded-circle' /> : null
     
    return (
        <Navbar className='menu' variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>
                    <Logo/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className='ms-auto'>
                            <Link className="nav-link" to="/">Home</Link>
                            <NavDropdown title="Plantillas" id="nav-dropdown">
                                <NavDropdown.Item to="*">Estudios de mercado</NavDropdown.Item>
                                <NavDropdown.Item to="*">
                                Evaluación de eventos
                                </NavDropdown.Item>
                                <NavDropdown.Item to="*">
                                    Evaluación del profesor
                                </NavDropdown.Item>
                            </NavDropdown>
                                {linkRegister}
                                {linklogin}
                        { userState ? <NavDropdown title={greet} id="nav-dropdown">
                            {userState ? <NavDropdown.Item><a className="text-dark aLink" onClick={() => context.setUser({})}> Cerrar sesion</a></NavDropdown.Item> : null}
                        </NavDropdown> : null }
                                <div className="w-25">
                                    {showImg}
                                </div>
                        </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default Navigation;