import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "./components/config/axiosInit";
import Navigation from "./components/layout/navigation/Navigation.js";
import Home from './components/views/home/Home.js'
import Error404 from './components/views/error404/Error404'
import Footer from './components/layout/footer/Footer';
import Register from './components/views/register/Register'
import SurveyDetails from "./components/views/home/surveyDetails/SurveyDetails";

function App() {
    const [surveys, setSurveys] = useState([]);
    
    const getApi = async () => {
        try {
          /*  const res = await fetch(URL);
          const productApi = await res.json();
          setProducts(productApi);
           */
          const res = await axios.get(URL);
          //console.log(res.data);
          const surveyApi = res.data;
          setSurveys(surveyApi);
        } catch (error) {
          // console.log(error);
        }
      };
    

    return (
        <Router>
            <Navigation />
            <main>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route
                        exact
                        path="/survey/:id"
                        element={<SurveyDetails URL={URL} surveys={surveys} />}
                    />
                    <Route exact path='/register' element={<Register />} />
                    <Route exact path='*' element={<Error404 />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;

