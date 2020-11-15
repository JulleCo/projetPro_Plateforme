import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Axios from "axios";
import reducer from "./Hooks/Reducer";
import "./App.scss";

import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import { AnnoncePlaceCardList } from "./components/pages/AnnoncePlaceCardList";
import { HomePage } from "./components/pages/HomePage";
import { Settings } from "./components/pages/Settings";
import { Inscription } from "./components/pages/Inscription";
import { Connexion } from "./components/pages/Connexion";
import { AnnoncePlace } from "./components/pages/AnnoncePlace";
import { Contact } from "./components/pages/Contact";
import { NavBar } from "./components/organisms/NavBar";
import { UserProfil } from "./components/organisms/UserProfil";
import { UserAnnonce } from "./components/organisms/UserAnnonce";

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};

export const AuthContext = React.createContext({
  state: null,
  dispatch: () => {},
});

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

function App() {
  const [state, dispatch] = useReducer(reducer.reducer, initialState);
  const [error, setError] = useState(" ");

  const token = localStorage.getItem("token");
  useEffect(() => {
    const axiosData = async () => {
      try {
        const result = await Axios({
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          url: "http://localhost:1234/user/me",
        });
        dispatch({
          type: "LOAD_USER",
          payload: result.data,
        });
      } catch (error) {
        setError(error.response.data.error);
      }
    };
    axiosData();
  }, []);
console.log("app state", state)
console.log("authcontext", AuthContext.state)
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <AuthContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <Router>
          <div className="App">
            <Header />
            <div>{error}</div>
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact path="/settings">
                  <Settings />                   
                </Route>
                <Route exact path="/hebergements/:id">
                  <AnnoncePlace />
                </Route>
                <Route exact path="/hebergements">
                  <AnnoncePlaceCardList />
                </Route>
                <Route exact path="/contact">
                  <Contact />
                </Route>
                <Route exact path="/inscription">
                  <Inscription />
                </Route>
                <Route exact path="/connexion">
                  <Connexion />
                </Route>
                <Route exact path="/">
                  <HomePage />
                </Route>
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </AuthContext.Provider>
    </AlertProvider>
  );
}

export default App;
