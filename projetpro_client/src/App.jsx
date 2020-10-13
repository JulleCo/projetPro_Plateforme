import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Axios from "axios";

import "./App.scss";

import { AnnoncePlaceCardList } from "./components/pages/AnnoncePlaceCardList";
import { HomePage } from "./components/pages/HomePage";
import { Settings } from "./components/pages/Settings";
import { Inscription } from "./components/pages/Inscription";
import { Connexion } from "./components/pages/Connexion";
import { AnnoncePlace } from "./components/pages/AnnoncePlace";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import reducer from "./Hooks/Reducer";

export const AuthContext = React.createContext({
  state: null,
  dispatch: () => {},
});

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

function App() {
  const [state, dispatch] = useReducer(reducer.reducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const result = await Axios("http://localhost:1234/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({
          type: "LOAD_USER",
          payload: result.data,
        });
      }
    };
    fetchUser();
  }, []);

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
