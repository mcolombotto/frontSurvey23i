import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import './Footer.css'
const Footer = () => {
    return (
        <div>
            <footer className='style-footer'>
                <Container>
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/contact">Contacto</Link> 
                </Container>   
            </footer>
        </div>
    );
};

export default Footer;