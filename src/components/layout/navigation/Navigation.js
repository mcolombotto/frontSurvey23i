import React, {useContext} from 'react';
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
    const userState = context.user.state
    const linkRegister = !userState ? <Link className="nav-link" to="/register">Registrate</Link> : '';
    const linkLogin = !userState ? <Link className="nav-link" to="/login">Login</Link> : '';
    const greet = userState ? <Link className="nav-link w-75 text-capitalize me-md-auto d-none d-sm-block" to="/login">{`Hola ${usernameNew}`}</Link> : null;
    const classP = userState ? 'pe-5' : ''
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
                            <div className='w-50'>
                                <div className='w-50'>
                                    {showImg}
                                </div>
                            </div>
                            {greet}
                            <Link className="nav-link" to="/">Home</Link>
                            <NavDropdown title="Plantillas" className={classP} id="nav-dropdown">
                                <NavDropdown.Item to="/Plantillas/EstudiosDeMercado">Estudios de mercado</NavDropdown.Item>
                                <NavDropdown.Item to="/Plantillas/EvaluacionDeEventos">
                                Evaluación de eventos
                                </NavDropdown.Item>
                                <NavDropdown.Item to="/Plantillas/ EvaluaciónDelProfesor">
                                    Evaluación del profesor
                                </NavDropdown.Item>
                            </NavDropdown>
                            {linkRegister}
                            {linkLogin}

                        </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default Navigation;

