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
    const userState = context.user.state
    const linkRegister = !userState ? <Link className="nav-link" to="/register">Registrate</Link> : '';
    const greet = userState ? <Link className="nav-link text-capitalize me-md-auto d-none d-sm-block" to="/login">{`${usernameNew}`}</Link> : null;
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
                                <NavDropdown.Item to="/Plantillas/EstudiosDeMercado">Estudios de mercado</NavDropdown.Item>
                                <NavDropdown.Item to="/Plantillas/EvaluacionDeEventos">
                                Evaluación de eventos
                                </NavDropdown.Item>
                                <NavDropdown.Item to="/Plantillas/ EvaluaciónDelProfesor">
                                    Evaluación del profesor
                                </NavDropdown.Item>
                            </NavDropdown>
                            
                            <NavDropdown className='pt-0 align-top' title={userState ? 
                                <div className='d-flex flex-direction-row w-100'> 
                                        <div>
                                            {greet}
                                        </div>
                                    </div>: <Link className="nav-link" to="/login">Login</Link> } id="nav-dropdown">
                            {userState ? <Link className="text-dark" onClick={() => context.setUser({})}> Cerrar sesion</Link> : 
                                <NavDropdown.Item><Link className="text-dark" to='/login'>Ingresar al login</Link></NavDropdown.Item>} 
                            </NavDropdown>
                            {linkRegister}
                            <div className="w-50">
                            <div className="w-25">
                                    {showImg}
                               </div>
                            </div>
                        </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default Navigation;

