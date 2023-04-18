import React from 'react';
import './Error404.css'
import ErroImg from '../../../assets/img/gif-error-Sw.gif'
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div className='error-container justify-content-center'>
            <div className='row'>
                <div className="col-12 text-center mt-5">
                    <h1 className='mb-1 display-1'>ERROR</h1>
                </div>
                <div className='col-12 text-center justify-content-center img-container'>
                    <img src={ErroImg} alt="gift de error" className='img-fluid picture-error' />
                    <div className=' col-12'>
                        <h2 className='mb-5'>Pàgina no encontrada</h2>
                        <Link className="btn btn-success mb-5 " to="/">Ir al Home</Link>
                    </div>
                </div>
               
               
            </div>
            </div>
          
    );
};

export default Error404;

