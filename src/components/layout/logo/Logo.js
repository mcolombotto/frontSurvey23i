import React from 'react'
import LogoImg from '../../../assets/img/logo-WS.png';
import './Logo.css';
import { Link } from 'react-router-dom';
const Logo = ()=>{
    return (
        <>
            <Link to="/">
                 <div className = 'Container-logo'>
                    <img className='img-fluid' src={ LogoImg } alt="Logo de la empresa WorldSurveys" />
                </div>
            </Link>
        </>
    );
}

export default Logo;