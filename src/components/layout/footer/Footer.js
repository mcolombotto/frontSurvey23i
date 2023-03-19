import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import './Footer.css'
import '../'
const Footer = () => {
    return (
        <div>
            <footer className='footer-style d-flex '>
                <Container>
                    <Link className="footer-link" to="/">Home</Link>
                    <Link className="footer-link" to="/contact">Contacto</Link> 
                </Container>   
            </footer>
        </div>
    );
};

export default Footer;