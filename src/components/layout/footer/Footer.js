import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Logo from "../logo/Logo";
import './Footer.css'

const Footer = () => {
    return (
        <div>
            <footer className='footer-style p-3 w-100'>
                <Navbar variant="dark">
                    <Container>
                            <div className='row d-flex align-items-center justify-content-center'>
                                <Navbar.Brand className='col-md-4 col-sm-6 col-lg-2 m-auto d-flex '>
                                    <div className='m-auto '>
                                        <Logo />
                                    </div>
                                </Navbar.Brand>
                                    <Nav className="row d-flex  text-center col-md-8 col-sm-6 col-lg-10 justify-content-lg-between">
                                        <Link className="nav-link col-sm-6 col-md-3 col-lg-2'" to="/">Home</Link>
                                    <Link className="nav-link col-sm-6 col-md-3 col-lg-2" to="/register">Registrate</Link>
                                <Link className="nav-link col-sm-6 col-md-3 col-lg-2" to="/nosotros">Nosotros</Link>
                                    <Link className="nav-link col-sm-6 col-md-3 col-lg-2" to="*">Ver más</Link>
                                </Nav>
                                 <div className='col-12 text-white mt-3'>
                                <p className="text-center">
                                        WorldSurveys. All rights reserved &copy;
                                     </p>
                                 </div> 
                            </div>   
                             
                    </Container> 
                </Navbar>  
            </footer>
        </div>
    );
};

export default Footer;


  
