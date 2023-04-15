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
import SurveyCreate from './components/views/surveyCreate/SurveyCreate'
import Us from './components/views/us/Us'
function App() {
    const [user, setUser] = React.useState({});

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
                <Navigation />
                <main>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path='/register' element={<Register />} />
                        <Route exact path='/error' element={<Error404 />} />
                        <Route exact path='/login' element={<Login />} />
                        <Route exact path='/surveyCreate' element={<SurveyCreate />} />
                        <Route exact path='/us' element={<Us />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </UserContext.Provider>
    );
}

export default App;