import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "./components/config/axiosInit";
import Home from "./components/views/home/Home";
import SurveysTable from "./components/views/home/surveyTable/surveyTable";
import SurveyCreate from "./components/views/home/surveyCreate/SurveyCreate";
import SurveyEdit from "./components/views/home/surveyEdit/SurveyEdit";
import SurveyDetails from "./components/views/home/surveyDetails/SurveyDetails";
import Navigation from "./components/layout/navigation/Navigation";
import Footer from "./components/layout/footer/Footer"
import Login from "./components/views/login/Login";
import Register from "./components/views/register/Register";
import Error404 from "./components/views/error404/Error404";
import ProtectedRoute from "./components/routes/ProtectedRoute";


function App() {
  const [surveys, setSurveys] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});

  const URL = process.env.REACT_APP_API_SURVEYS;

  useEffect(() => {
    //llamado a la API
    getApi();
  }, []);

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
  <BrowserRouter>
  <Navigation loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
    <main>
      <Routes>
        <Route exact path="/" element={<Home surveys={surveys} />} />
        <Route
          path="/*"
          element={
            //<ProtectedRoute>
              <Routes>
                <Route
                  exact
                  path="/survey/table"
                  element={
                    <SurveysTable
                      surveys={surveys}
                      URL={URL}
                      getApi={getApi}
                    />
                  }
                />
                <Route
                  exact
                  path="/survey/create"
                  element={<SurveyCreate URL={URL} getApi={getApi} />}
                />
                <Route
                  exact
                  path="/survey/edit/:id"
                  element={<SurveyEdit URL={URL} getApi={getApi} />}
                />
              </Routes>
            //</ProtectedRoute>
          }
        />
        <Route
          exact
          path="/survey/details/:id"
          element={<SurveyDetails URL={URL} surveys={surveys}/>}
        />
        <Route
          exact
          path="/auth/login/"
          element={<Login setLoggedUser={setLoggedUser} />}
        />
        <Route
          exact
          path="/auth/register/"
          element={<Register setLoggedUser={setLoggedUser} />}
        />
        <Route exact path="*" element={<Error404 />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>);
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