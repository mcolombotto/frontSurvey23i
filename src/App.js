import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from "./components/layout/navigation/Navigation.js";
import Home from './components/views/home/Home.js'
import Error404 from './components/views/error404/Error404'
import Footer from './components/layout/footer/Footer';
import Register from './components/views/register/Register'
import UserContext from './components/layout/context/UserContext'
import Login from './components/views/login/Login'

function App() {
  const [user, setUser] = React.useState({});
  const token = localStorage.getItem('token');
  console.log('user', user);
  console.log('token',token);

  return (
    <div className='app'>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
            <Navigation />
            <main className='content'>
              <Routes>
                  <Route exact path='/' element={ <Home/> }/>
                  <Route exact path='/register' element={<Register/>}/>
                  <Route exact path='*' element={<Error404/> }/>
                  <Route exact path='/login' element={<Login/>} />
              </Routes>
            </main>
            <Footer/>
        </Router>   
      </UserContext.Provider>
    </div> 
  );
}

export default App;