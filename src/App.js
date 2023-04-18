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

    const [categoryItemList, setCategoryItemList] = useState([]);

    const [surveys, setSurveys] = useState([]);

    const URL = process.env.REACT_APP_API_SURVEYS;
    const URL2 = process.env.REACT_APP_API_CATEGORY;
    
    const getApi = async () => {
        try {
          
          const res = await axios.get(URL, {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": JSON.parse(localStorage.getItem("user-token"))
                .token,
            },
          });
          
          const cat = await axios.get(URL2);
          //console.log(res.data);
          const surveyApi = res.data;
          const categoryApi = cat.data;
          setSurveys(surveyApi);
          setCategoryItemList(categoryApi);
        } catch (error) {
          // console.log(error);
        }
      };
    

    return (
        <Router>
            <Navigation />
            <main>
                <Routes>
                <Route exact path="/" element={<Home surveys={surveys} categoryItemList={categoryItemList} />} />
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

