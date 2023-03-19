import React, { useState } from 'react';
import './Register.css'


const Register = () => {
  
	const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');

	// Funcion que se encargara de validar los datos y enviar el formulario
	const handleSubmit = (e) => {
         e.preventDefault();

         // Comprobamos validacion del formulario ...
         // Si todo es correcto enviamos el formulario

         console.log('Formulario Enviado!');
	}

	// Funcion que se encarga de cambiar el estado del inputName
	const handleInputName = (e) => {
                setInputName(e.target.value);
	}

	// Funcion que se encarga de cambiar el estado del inputEmail
	const handleInputEmail = (e) => {
                setInputEmail(e.target.value);
	}

            return (
                <div className='form-container'>
                <form action="" onSubmit={handleSubmit} className="form">
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            id="name"
                            maxLength={35}
                            value={inputName}
                            onChange={handleInputName}
                        />
                    </div>

                    <div>
                        <label htmlFor="email">email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            id="email"
                            maxLength={50}
                            value={inputEmail}
                            onChange={handleInputEmail}
                        />
                    </div>

                    <button type="submit">Enviar</button>
                </form>
            </div>
            )
     

};

export default Register;