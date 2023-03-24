import React from 'react'
import { useForm } from "react-hook-form";
import { Alert, Container, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './Register.css'

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
    }

    console.log(errors);

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
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
                        {errors.name && errors.name.type === 'required' && <span className='error'>Este campo es requerido </span>}
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
                        {errors.email && <span className='error'>Este campo es requerido </span>}
                        {errors.email && errors.email.type === 'maxLength' && <span className='error'>Este campo tiene un maximo de 60 caracteres</span>}
                        {errors.email && errors.email.type === 'pattern' && <span className='error'> El correo solo puede contener letras, numeros, puntos, guiones y guion bajo, y requiere @email.com </span>}
{/* 
                        //   errors.email = 'El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.'
                        //La contraseña no es valida. Esta debe tener mìnimo 8 caracteres, màximo 25, 
                        al menos una letra mayúscula, al menos una letra minucula y al menos 1 caracter especial.'` */}
                    </div>
                    <div className='mb-3'>
                        <Form.Label>Contraseña*</Form.Label>
                        <input 
                            className="form-control " 
                            type='password'
                            {...register("password1", { required: true, maxLength: 90, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,90}/ })} 
                        />
                        {errors.password1 && <span className='error'>Este campo es requerido</span>}
                        {errors.password1 && errors.password1.type === 'maxLength' && <span className='error'> Este campo tiene un maximo de 90 caracteres</span>}
                        {errors.password1 && errors.password1.type === 'pattern' && <span className='error'>La contraseña no es valida. Esta debe tener mìnimo 8 caracteres,
                            al menos una letra mayúscula, al menos una letra minucula y al menos 1 caracter especial (@$!%*?&) </span>}

                    </div>
                    <div className='mb-3'>
                        <Form.Label>Repetir contraseña*</Form.Label>
                        <input 
                            className="form-control " 
                            type='password'
                            {...register("password2", { required: true, maxLength: 90, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,90}$/ })} 
                        />
                        {errors.password2 && <span className='error'>Este campo es requerido</span>}
                        {errors.password2 && errors.password2.type === 'maxLength' && <span className='error'>Este campo tiene un maximo de 90 caracteres</span>}
                        {errors.password2 && errors.password2.type === 'pattern' && <span className='error'>La contraseña no es valida. Esta debe tener mìnimo 8 caracteres,
                            al menos una letra mayúscula, al menos una letra minucula y al menos 1 caracter especial (@$!%*?&)</span>}
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