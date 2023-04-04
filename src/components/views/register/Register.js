import React, { useState, useContext, useEffect} from 'react';
import UserContext from '../../layout/context/UserContext';
import { useForm } from "react-hook-form";
import { Container, Form } from "react-bootstrap";
import './Register.css';
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [errorPassword, setErrorPassword] = useState(false);
    const [typeInput, setTypeInput] = useState('password')

    const context = useContext(UserContext);
    const navigate = useNavigate()
    //variable de entorno
    const URL = process.env.REACT_APP_API_SURVEYS_USER;

    const onSubmit = async data => {
        setErrorPassword(false);
    
        if (data.password1 !== data.password2) {
            setErrorPassword(true);
        } else {
            try {
                const res = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        username: data.name,
                        email: data.email,
                        password: data.password1
                    }),
                });

                const response = await res.json();
                const { token, uid, userName, message } = response;

                if (res.status === 200) {
                    reset(formValues => ({
                        ...formValues,
                        name: '',
                        email: '',
                        password1: '',
                        password2: '',
                    }));
                    
                    localStorage.setItem('token', token);

                    context.setUser({
                        uuid: uid,
                        username: userName,
                        email: data.email,
                        estate: true,
                        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUJt3kjJp8q750SzS-kr7cMITugGpEh-Vdq0NeWS4&s'
                    });

                    Swal.fire(message);
                    return setTimeout(() => { navigate("/") }, 2500)
                } 

                if (res.status === 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: message,
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ocurrio un problema, vuelve a intentarlo!',
                    })
                };
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El envío de datos falló!',
                })
            }
       };
    }
      
    return (
        <div className='mainRegister'>
            <Container className="py-5 ">
                <div className='form-container row justify-content-center'>
                    <form className="my-5 form col-sm-8 col-lg-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-3'>
                            <h1 className='text-center'>Registro</h1>
                        </div>
                        <div className='mb-3'>
                            <Form.Label>Nombre de usuario<span className='text-danger font-weight-bold'>*</span> </Form.Label>
                            <input
                                className="form-control "
                                placeholder="Ej: John Perez"
                                {...register("name", { required: true, maxLength: 100, pattern: /^[A-Za-z\s?]+$/ })}
                            />

                            {errors.name && errors.name.type === 'required' && <span className='error'>Este campo es requerido. </span>}
                            {errors.name && errors.name.type === 'maxLength' && <span className='error'>Este campo tiene un maximo de 60 </span>}
                            {errors.name && errors.name.type === 'pattern' && <span className='error'>En este campo solo puedes ingresar letras</span>}

                        </div>
                        <div className='mb-3'>
                            <Form.Label>Email<span className='text-danger font-weight-bold'>*</span></Form.Label>
                            <input
                                className="form-control "
                                type='email'
                                placeholder="Ej: John_Perez@email.com"
                                {...register("email", { required: true, maxLength: 100, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })}
                            />
                            {errors.email && errors.email.type === 'required' && <span className='error'>Este campo es requerido. </span>}
                            {errors.email && errors.email.type === 'maxLength' && <span className='error'>Este campo tiene un maximo de 60 caracteres</span>}
                            {errors.email && errors.email.type === 'pattern' && <span className='error'> El correo tiene un formato incorrecto. Formato esperado: email@email.com </span>}
                        </div>
                        <div className='mb-3 position-relative'>
                            <Form.Label>Contraseña<span className='text-danger font-weight-bold'>*</span></Form.Label>
                            <input
                                className="form-control "
                                type={typeInput}
                                {...register("password1", { required: true, maxLength: 100, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,90}/ })}
                            />
                            <button
                                type="button"
                                className='position-absolute  buttonPosition btn'
                                onClick={() => { typeInput === 'password' ? setTypeInput('text') : setTypeInput('password') }}
                            >
                                {typeInput === 'password' ? <FaEyeSlash /> : < FaEye />}
                            </button>
                            {errors.password1 && errors.password1.type === 'required' && <span className='error'>Este campo es requerido. </span>}
                            {errors.password1 && errors.password1.type === 'maxLength' && <span className='error'> Este campo tiene un maximo de 90 caracteres</span>}
                            {errors.password1 && errors.password1.type === 'pattern' && (
                                <span className='error'>
                                    La contraseña no es valida. Esta debe tener mìnimo 8 caracteres, al menos una letra mayúscula,
                                    al menos una letra minucula y al menos un caracter especial (@$!%*?&)
                                </span>
                            )}
                        </div>
                        <div className='mb-3 position-relative'>
                            <Form.Label>Repetir contraseña<span className='text-danger font-weight-bold'>*</span></Form.Label>
                            <input
                                className="form-control "
                                type={typeInput}
                                {...register("password2", { required: true, maxLength: 100, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,90}$/ })}
                            />
                            {errors.password2 && errors.password2.type === 'required' && <span className='error'>Este campo es requerido. </span>}
                            {errors.password2 && errors.password2.type === 'maxLength' && <span className='error'>Este campo tiene un maximo de 90 caracteres</span>}
                            {errors.password2 && errors.password2.type === 'pattern' && <span className='error'>La contraseña no es valida. Esta debe tener mìnimo 8 caracteres,
                                al menos una letra mayúscula, al menos una letra minucula y al menos un caracter especial (@$!%*?&)</span>}
                            {errorPassword && <span className='error'>Las contraseñas no coinciden</span>}
                            <button
                                type="button"
                                className='position-absolute buttonPosition btn'
                                onClick={() => { typeInput === 'password' ? setTypeInput('text') : setTypeInput('password') }}
                            >
                                {typeInput === 'password' ? <FaEyeSlash /> : < FaEye />}
                            </button>
                        </div>
                        <div>
                            <button className="btn btn-danger" type="submit"> Enviar</button>
                        </div>
                    </form>
                </div>
            </Container >    
        </div>
    )
}

export default Register