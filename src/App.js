import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/layout/navigation/Navigation.js";
import Home from "./components/views/home/Home.js";
import Error404 from "./components/views/error404/Error404";
import Footer from "./components/layout/footer/Footer";
import Register from "./components/views/register/Register";
import Us from "./components/views/us/Us";
import Login from "./components/views/login/Login";
import React from "react";
import axios from "./components/config/axiosInit";
import SurveysTable from "./components/views/home/surveyTable/surveyTable";
import SurveyCreate from "./components/views/home/surveyCreate/SurveyCreate";
import SurveyEdit from "./components/views/home/surveyEdit/SurveyEdit";
import SurveyDetails from "./components/views/home/surveyDetails/SurveyDetails";
import CategoryTable from "./components/views/home/categoryTable/categoryTable";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import UserContext from './components/layout/context/UserContext'

function App() {
  const [surveys, setSurveys] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});
  const [user, setUser] = useState({});

  const [categoryItem, setCategoryItem] = useState({
    categoryName : "",
    categoryStatus : "",
  });
  const token = localStorage.getItem('token');
  console.log('user', user);
  console.log('token',token);

  const [categoryItemList, setCategoryItemList] = useState([]);

  const URL = process.env.REACT_APP_API_SURVEYS;

  const URL2 = process.env.REACT_APP_API_CATEGORY;

  useEffect(() => {
    getApi();
  }, []);

  const getApi = async () => {
    try {
      
      const res = await axios.get(URL);
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
   <UserContext.Provider value={{ user, setUser }}>
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
                    <SurveysTable surveys={surveys} URL={URL} getApi={getApi} />
                  }
                />
                <Route
                  exact
                  path="/category/table"
                  element={
                    <CategoryTable categoryItemList={categoryItemList}
                    setCategoryItemList={setCategoryItemList} 
                    categoryItem = {categoryItem}
                    setCategoryItem = {setCategoryItem}
                    getApi={getApi}
                    URL = {URL2}
                    />
                  }
                />
                <Route
                  exact
                  path="/survey/create"
                  element={
                    <SurveyCreate
                      URL={URL}
                      getApi={getApi}
                      categoryItemList={categoryItemList}
                      categoryItem={categoryItem}
                    />
                  }
                />
                <Route
                  exact
                  path="/survey/edit/:id"
                  element={
                    <SurveyEdit
                      URL={URL}
                      getApi={getApi}
                      categoryItemList={categoryItemList}
                      categoryItem={categoryItem}
                    />
                  }
                />
              </Routes>
              //</ProtectedRoute>
            }
          />
          <Route
            exact
            path="/survey/details/:id"
            element={<SurveyDetails URL={URL} surveys={surveys} />}
          />
          <Route
            exact
            path="/login"
            element={<Login setLoggedUser={setLoggedUser} />}
          />
          <Route
            exact
            path="/register"
            element={<Register setLoggedUser={setLoggedUser} />}
          />
          <Route exact path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
   </UserContext.Provider>
  );
}

export default App;