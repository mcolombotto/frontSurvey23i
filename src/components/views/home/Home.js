import React from 'react';
import Slider from './slider';
import slides  from './formsDB.json'
import Cards from './Cards.js';



const Home = () => {
    return (
    <>
        <Slider slides={slides}/>
        <Cards/>

    </>
    );
};

export default Home;


/*Banner
	|
	|
	--Formulario propio *
	|
	--Cambiar img segun form *
	|
	--Cambiar titulo desc según form *

subBanner
	|
	|
	--Mostrar los form en una box 
	|
	--Permitir ordenar según categoria
	|
	--Paginación


------
FORMS |
------
	|
	|
	--Crearse basico con bootstrap
	|
	--Validaciones
	|
	--Categorias
	|
	-Enviar mail con respuestas
 */