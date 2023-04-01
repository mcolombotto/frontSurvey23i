import React from 'react';
import Heading from '../Heading';
import Section from '../Section';
const Us = () => {
    return (
        <div className='us'>
            <h1 className='text-center'>Hola</h1>
            <Section level={4}>
                <Heading>About</Heading>
                <p>Nosotros somos una pequeña comunidad que se dedica a programar</p>
                <Heading>Photos</Heading>
                <Heading>Videos</Heading>
            </Section>
            <Section level={5}>
                <Heading>Miembros</Heading>
                <li>
                    <ul>
                        Mariano
                    </ul>
                    <ul>
                        Luciano
                    </ul>
                    <ul>
                        Yuli
                    </ul>
                    <ul>
                        Erick
                    </ul>
                    <ul>
                        Juan
                    </ul>
                </li>
            </Section>
        </div>
    );
};

export default Us;