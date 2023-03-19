import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Logo from "../logo/Logo";
import './Footer.css'

const Footer = () => {
    return (
        <div>
            <footer className='footer-style'>
                <Container>
                    <div className='d-flex  justify-content-between  align-items-center p-3'>
                        <Logo />
                        <div className='d-flex text-center justify-content-around ms-auto w-25'>
                            <div>
                                <Link className="footer-link" to="/">Home</Link>
                            </div>
                            <div>
                                <Link className="footer-link" to="/contact">Contacto</Link>
                            </div>
                        </div>
                    </div>
                   
                </Container>   
            </footer>
        </div>
    );
};

export default Footer;