import React from "react";
import "./App.scss";
import { ButtonMenu } from "./components/atoms/ButtonMenu";

// import { HomePage } from "./components/pages/HomePage";
// import { Settings } from "./components/pages/Settings";
// import { AnnoncePlaceCardList } from "./components/pages/AnnoncePlaceCardList";
// import { Inscription } from "./components/pages/Inscription";
// import { AnnoncePlace } from "./components/pages/AnnoncePlace";

function App() {
  return (
    // <Router>
      <div className="App">
        <ButtonMenu buttonType="carré" name="test"/>
        
        <ButtonMenu buttonType="rectangleHoriz" name="test"/>
        <ButtonMenu buttonType="rectangleVerti" name="test"/>

        {/* <Header /> */}
        <div className="container">
          {/* <Switch> */}
            {/* <Route exact path="/settings">
              <Settings />
            </Route>
            <Route path="/hebergement/:id">
              <AnnoncePlace />
            </Route>
            <Route path="/hebergements">
              <AnnoncePlaceCardList />
            </Route>
            <Route path="/inscription">
              <Inscription />
            </Route>
            <Route path="/">
              <HomePage />
            </Route> */}
          {/* </Switch> */}
        </div>
      </div>
    // </Router>
  );
}

export default App;
