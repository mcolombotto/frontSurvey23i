import React, { useState, useContext } from 'react';
import UserContext from '../../layout/context/UserContext';
import { useForm } from "react-hook-form";
import { Container, Form } from "react-bootstrap";
import './Register.css';
import Swal from 'sweetalert2'

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [errorPassword, setErrorPassword] = useState(false);
    const context = useContext(UserContext);
    const newUserName = context.user.username
    const Swal = require('sweetalert2');
    //console.log('context', context, context.user.username, context.user.img);
   
    const onSubmit = data => {
        setErrorPassword(false);
    
        if (data.password1 !== data.password2) {
            setErrorPassword(true);
        } else {
            fetch('https://randomuser.me/api/')
                .then((resp) => resp.json())
                .then((data) => {
                    
                    const myUser = {
                        username: data.results[0].login.username,
                        email: data.results[0].email,
                        password: 'invento',
                        uuid: data.results[0].login.uuid,
                        img: data.results[0].picture.large,
                        role:'user_role',
                        state: true
                    } 
                    context.setUser(myUser)
                    
                    reset(formValues => ({
                        ...formValues,
                        name: '',
                        email: '',
                        password1: '',
                        password2: '',
                    }));
                    Swal.fire(`Tu registro fue exitoso`)

                })
                .catch(error => console.error(error))    
        }
    }
  

    
    return (
        <Container className="py-5">
            <div className='form-container row mainRegister'>
                <form className="my-5 form col-sm-8 col-lg-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-3'>
                        <h1 className='text-center'>Registro</h1>
                    </div>
                    <div className='mb-3'>
                        <Form.Label>Nombre de usuario*</Form.Label>
                        <input 
                            className="form-control " 
                            placeholder="Ej: John Perez"
                            {...register("name", { required: true, maxLength: 60, pattern: /^[A-Za-z\s?]+$/ })}
                        />
                        {errors.name && errors.name.type === 'required' && <span className='error'>Este campo es requerido. </span>}
                        {errors.name && errors.name.type === 'maxLength' && <span className='error'>Este campo tiene un maximo de 60 </span>}
                        {errors.name && errors.name.type === 'pattern' && <span className='error'>En este campo solo puedes ingresar letras</span>}
                        
                    </div>
                    <div className='mb-3'>
                        <Form.Label>Email*</Form.Label>
                        <input 
                            className="form-control " 
                            type='email'
                            placeholder="Ej: John_Perez@email.com"
                            {...register("email", { required: true, maxLength: 60, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })} 
                        />
                        {errors.email && errors.email.type === 'required' && <span className='error'>Este campo es requerido. </span>}
                        {errors.email && errors.email.type === 'maxLength' && <span className='error'>Este campo tiene un maximo de 60 caracteres</span>}
                        {errors.email && errors.email.type === 'pattern' && <span className='error'> El correo tiene un formato incorrecto. Formato esperado: email@email.com </span>}
                    </div>
                    <div className='mb-3'>
                        <Form.Label>Contraseña*</Form.Label>
                        <input 
                            className="form-control " 
                            type='password'
                            {...register("password1", { required: true, maxLength: 90, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,90}/ })} 
                        />
                        {errors.password1 && errors.password1.type === 'required' && <span className='error'>Este campo es requerido. </span>}
                        {errors.password1 && errors.password1.type === 'maxLength' && <span className='error'> Este campo tiene un maximo de 90 caracteres</span>}
                        {errors.password1 && errors.password1.type === 'pattern' && <span className='error'>La contraseña no es valida. Esta debe tener mìnimo 8 caracteres,
                            al menos una letra mayúscula, al menos una letra minucula y al menos un caracter especial (@$!%*?&) </span>}

                    </div>
                    <div className='mb-3'>
                        <Form.Label>Repetir contraseña*</Form.Label>
                        <input 
                            className="form-control " 
                            type='password'
                            {...register("password2", { required: true, maxLength: 90, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,90}$/ })} 
                        />
                        {errors.password2 && errors.password2.type === 'required' && <span className='error'>Este campo es requerido. </span>}
                        {errors.password2 && errors.password2.type === 'maxLength' && <span className='error'>Este campo tiene un maximo de 90 caracteres</span>}
                        {errors.password2 && errors.password2.type === 'pattern' && <span className='error'>La contraseña no es valida. Esta debe tener mìnimo 8 caracteres,
                            al menos una letra mayúscula, al menos una letra minucula y al menos un caracter especial (@$!%*?&)</span>}
                        {errorPassword && <span className='error'>Las contraseñas no coinciden</span>}
                    </div>
                    <div>
                        <button className="btn btn-danger" type="submit"> Enviar</button>
                    </div>
                </form>
            </div>
        </Container >
       
    );
}

export default Register