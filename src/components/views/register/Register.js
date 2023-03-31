import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Container, Form } from "react-bootstrap";
import './Register.css'


const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [errorPassword, setErrorPassword] = useState(false);
    const [userInformation, setUserInformation] = useState({});
    
   
    const onSubmit = data => {
        setErrorPassword(false);
    
        if (data.password1 !== data.password2) {
            setErrorPassword(true);
        } else {
            fetch('https://randomuser.me/api/')
                .then((resp) => resp.json())
                .then((data) => {
                    const myUser = {
                        email: data.results[0].email,
                        username: data.results[0].login.username,
                        uuid: data.results[0].login.uuid,
                        picture: data.results[0].picture.large
                    }
                    setUserInformation(myUser)
                   
                    reset(formValues => ({
                        ...formValues,
                        name: '',
                        email: '',
                        password1: '',
                        password2: '',
                    }));


                })
                .catch(error => console.error(error))    
        }
    }
    //descomenta la siguiente linea para ver el objeto de userInformation
    //console.log(userInformation);

    return (
        <Container className="py-5">
           
        </Container >
       
    );
}

export default Register