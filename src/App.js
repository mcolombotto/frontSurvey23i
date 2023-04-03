import { useEffect, useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from "./components/layout/navigation/Navigation.js";
import Home from './components/views/home/Home.js'
import Error404 from './components/views/error404/Error404'
import Footer from './components/layout/footer/Footer';
import Register from './components/views/register/Register';
//import UserContext from './components/layout/context/UserContext'
import Us from './components/views/us/Us';
import Login from './components/views/login/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import SurveysTable from './components/views/home/surveyTable/surveyTable';
import SurveyCreate from './components/views/home/surveyCreate/SurveyCreate';
import SurveyEdit from './components/views/home/surveyEdit/SurveyEdit';
import SurveyDetails from './components/views/home/surveyDetails/SurveyDetails';
import axios from 'axios';

function App() {
  const [surveys, setSurveys] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});

  const URL = process.env.REACT_APP_API_SURVEYS;

  useEffect(() => {
    getApi();
  }, []);

  const getApi = async () => {
    try {
      const res = await axios.get(URL);
    
      const surveyApi = res.data;
      setSurveys(surveyApi);
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
      <div>
        <BrowserRouter>
            <Navigation loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
            <main>
            <Routes>
                <Route exact path='/' element={ <Home surveys={surveys} />}/>
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
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
                    </ProtectedRoute>
                  }
                />
                <Route
                  exact
                  path="/survey/details/:id"
                  element={<SurveyDetails URL={URL} />}
                />
                <Route exact path='/auth/register' element={<Register setLoggedUser={setLoggedUser}/>}/>
                <Route exact path='*' element={<Error404/> }/>
                <Route exact path='/auth/login' element={<Login setLoggedUser={setLoggedUser}/>} />
                <Route exact path='/nosotros' element={<Us/>} />
            </Routes>
            </main>
            <Footer />
        </BrowserRouter>   
      </div>
  );
}

export default App;