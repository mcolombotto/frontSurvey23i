import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from "./components/layout/navigation/Navigation.js";
import Home from './components/views/home/Home.js'
import Error404 from './components/views/error404/Error404'
import Footer from './components/layout/footer/Footer';
import Register from './components/views/register/Register'
import Heading from './components/views/Heading';//TODO SACAR DESPUES
import Section from './components/views/Section'; //TODO SACAR DESPUES
//import Hijo from './components/layout/Hijo';
//import { UserProvider } from "./providers/UserProvider";

function App() {
 
  return (
   
      <Router>
        <Navigation />
        <main>
          {/* <>
            <div className='bg-danger'>
              <Hijo />
            </div>
          </> */}
          <Routes>
            <Route exact path='/' element={ <Home/> }/>
            <Route exact path='/register' element={ <Register/> }/>
            <Route exact path='*' element={<Error404/> }/>
          </Routes>
              
          <Section level={4}>
            <Heading>About</Heading>
            <Heading>Photos</Heading>
            <Heading>Videos</Heading>
          </Section>
        </main>
        <Footer/>
      </Router>   
  );
}

export default App;
