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
import Footer from "./components/layout/footer/Footer";
import Login from "./components/views/login/Login";
import Register from "./components/views/register/Register";
import Error404 from "./components/views/error404/Error404";
import CategoryTable from "./components/views/home/categoryTable/categoryTable";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import UserContext from './components/layout/context/UserContext'

function App() {
  const [surveys, setSurveys] = useState([]);
  const [activeSurveys, setActiveSurveys] = useState([]);
  const [loggedUser, setLoggedUser] = useState(( JSON.parse(localStorage.getItem("user-token"))==undefined? false : true));
  const [categoryItem, setCategoryItem] = useState({
    categoryName : "",
    categoryStatus : "",
  });
  const [user, setUser] = React.useState({});
  const [roleLogged, setRoleLogged] = useState();
  const token = localStorage.getItem("user-token");

  const [categoryItemList, setCategoryItemList] = useState([]);

  const URL = process.env.REACT_APP_API_SURVEYS;

  const URL2 = process.env.REACT_APP_API_CATEGORY;

  useEffect(() => {
    getApi();
  }, []);

  const getApi = async () => {
    try {
        if((localStorage.getItem("user-token"))!==null){
        const res = await axios.get(URL,{
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("user-token")).token  ,
        },
      }
        ); 
    
        const surveyApi = res.data.surveyList;
        console.log(res.data)
        setRoleLogged(res.data.userLogged);
        setSurveys(surveyApi);}
      const cat = await axios.get(URL2);
      const active = await axios.get(`${URL}/showActive`);
      setActiveSurveys(active.data)
      const categoryApi = cat.data;
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
          <Route exact path="/" element={<Home surveys={activeSurveys} categoryItemList={categoryItemList} />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
              <Routes>
                <Route
                  exact
                  path="/survey/table"
                  element={
                    <SurveysTable surveys={surveys} URL={URL} roleLogged={roleLogged} getApi={getApi} />
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
                    surveys={surveys}
                    URL = {URL2}
                    
                    />
                  }
                />
                <Route
                  exact
                  path="/survey/create"
                  element={
                    <SurveyCreate
                    surveys={surveys}
                      URL={URL}
                      getApi={getApi}
                      categoryItemList={categoryItemList}
                      categoryItem={categoryItem}
                    />
                  }
                />
                  <Route
                    exact
                    path="/survey/details/:id"
                    element={<SurveyDetails URL={URL} surveys={surveys} />}
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
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/login"
            element={<Login getApi={getApi} setLoggedUser={setLoggedUser} />}
          />
          <Route
            exact
            path="/register"
            element={<Register setLoggedUser={setLoggedUser} />}
          />
          <Route exact path='/error' element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
   </UserContext.Provider>
  );
}

export default App;

