import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.scss";

import { AnnoncePlaceCardList } from "./components/pages/AnnoncePlaceCardList";
import { HomePage } from "./components/pages/HomePage";
// import { Settings } from "./components/pages/Settings";
// import { Inscription } from "./components/pages/Inscription";
import { AnnoncePlace } from "./components/pages/AnnoncePlace";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";

function App() {
  return (
    <Router>
      <div className="App">


        <Header />
        <div className="container">
          <Switch>
            {/* <Route exact path="/settings">
              <Settings />
            </Route>*/}
            <Route path="/hebergements/:id">
              <AnnoncePlace />
            </Route>
            <Route path="/hebergements">
              <AnnoncePlaceCardList />
            </Route>
            {/* <Route path="/inscription">
              <Inscription />
            </Route> */}
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
