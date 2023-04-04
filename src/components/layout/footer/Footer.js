import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Logo from "../logo/Logo";
import './Footer.css'

const Footer = () => {
    return (
        <footer className='footer-style p-3 w-100'>
            <Navbar variant="dark">
                <Container>
                    <div className='row w-100 align-items-center'>
                        <Navbar.Brand className='col-md-4 col-sm-6 col-lg-2 m-auto d-flex '>
                            <div className='m-auto pe-4'>
                                <Logo />
                            </div>
                        </Navbar.Brand>
                        <Nav className="row d-flex  text-center col-md-8 col-sm-6 col-lg-10 justify-content-lg-between">
                            <Link className="nav-link col-sm-6 col-md-3 col-lg-2'" to="/">Home</Link>
                            <Link className="nav-link col-sm-6 col-md-3 col-lg-2" to="/register">Registrate</Link>
                            <Link className="nav-link col-sm-6 col-md-3 col-lg-2" to="*">Contacto</Link>
                            <Link className="nav-link col-sm-6 col-md-3 col-lg-2" to="*">Nosotros</Link>
                        </Nav>
                        <div className='col-12 text-white mt-3'>
                            <p className="text-center font">
                                WorldSurveys. All rights reserved &copy;
                            </p>
                        </div>
                    </div>

                </Container>
            </Navbar>
        </footer>
    );
};

export default Footer;



