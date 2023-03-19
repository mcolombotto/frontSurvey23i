import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from "./components/layout/navigation/Navigation.js";
import Home from './components/views/home/Home.js'
import Error404 from './components/views/error404/Error404'
import Footer from './components/layout/footer/Footer';
import Register from './components/views/register/Register'

function App() {
  return (
    <Router>
      <Navigation/>
      <Register/>
      <main>
        <Routes>
          <Route exact path='/' element={ <Home/> }/>
          <Route exact path='/register' element={ <Register/> }/>
          <Route exact path='*' element={<Error404/> }/>
        </Routes>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
/*

import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
<BrowserRouter>
  <Navigation />
  <main>
    <Routes>
      <Route exact path="/" element={<Home />} />

    </Routes>
  </main>
</BrowserRouter> */