import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, {useState} from 'react';
import './Register.css'

const Register = () => {
    const [submittedForm, setSubmittedForm] = useState(false)
        return (
               <Formik
                   initialValues={{
                    name:'',
                    email: '', 
                    password: ''
                   }}

                    validate={(values)=>{
                        let errors = {}
                        if(!values.name){
                            errors.name = 'Ingresa un nombre'
                        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
                            errors.name = 'El nombre solo puede contener letras y espacios'
                        }

                       if (!values.email) {
                           errors.email = 'Por favor ingresa un correo electronico'
                       } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                           errors.email = 'El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.'
                       }

                        if (!values.password) {
                            errors.password = 'Por favor ingresa un correo electronico'
                        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,25}$/.test(values.email)) {
                            errors.email = `La contraseña no es valida. Esta debe tener mìnimo 8 caracteres, màximo 25, 
                                            al menos una letra mayúscula, al menos una letra minucula y al menos 1 caracter especial.'`
                       }

                       return errors;
                  }}
                
                onSubmit={(values, { resetForm }) => {
                    resetForm();
                    console.log('Formulario enviado');
                    setSubmittedForm(true);
                    setTimeout(() => setSubmittedForm(false), 4000);
                    }} 
               >
                {( {errors} )=> (
                    <div className='form-container'>
                        <Form className='form'>
                            <div>
                                <label htmlFor="name">Nombre</label>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Juan Perez"
                                    id="name"
                                    maxLength={35}
                                />
                                <ErrorMessage name='name' component={()=>(
                                    <div className='error'>
                                        {errors.name}
                                    </div>
                                )}/> 
                            </div>

                            <div>
                                <label htmlFor="email">email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Juan_email@email.com"
                                    id="email"
                                    maxLength={50}
                                />
                                <ErrorMessage name='email' component={() => (
                                    <div className='error'>
                                        {errors.email}
                                    </div>
                                )} />
                            </div>

                            <div>
                                <label htmlFor="password">Contraseña</label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="********"
                                    id="password"
                                />
                                <ErrorMessage name='password' component={() => (
                                    <div className='error'>
                                        {errors.password}
                                    </div>
                                )} />
                            </div>

                            <button type="submit">Enviar</button>

                            {submittedForm && <p className="successfuly">Formulario enviado con exito!</p>}
                        </Form>
                    </div>
                  )}
                </Formik> 
        
            )
};

export default Register;