import React from 'react';
import './Error404.css'
import ErroImg from '../../../assets/img/gif-error-Sw.gif'
import Icon from '../../../assets/img/form-color.png'

const Error404 = () => {
    return (
        <div className='position-relative w-100 error-container'>
            <div className='img-container'>
                <img src={ErroImg} alt="gift de error" className='img-fluid picture-error'/>
            </div>
            <div className="text-position position-absolute text-center">
                <h1>No se puede acceder a este sitio</h1>
                <div className='icon-container ms-auto'>
                    <img src={Icon} className='img-fluid' alt="icono de formulario" />
                </div>
                
         </div>
        </div>
    );
};

export default Error404;

// <main class="bg-dark container-fluid position-relative main-content" id="paginaError">
//     <!--         se esta compartiendo la clase de login-picture -->
//     <img src="/img/404-error.gif" class="img-fluid w-100 picture-error" alt="imagen de error">
//         <figure">
//         <img src="/img/Madara-Uchiha-PNG-Free-Download (2).png" class="position-absolute error" alt="imagen de anime pagina no encontrada">

//         </figure>

//         


// </main>