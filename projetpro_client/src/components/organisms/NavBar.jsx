import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ButtonNav from "../atoms/ButtonNav";
import { useRouteMatch } from "react-router-dom";
import { ButtonLogout } from "../atoms/ButtonLogout";
import { AuthContext } from "../../App";

export function NavBar(props) {
  let history = useHistory();

  const redirectHebergements = () => {
    history.push("/hebergements");
  };
  const redirectSettings = () => {
    history.push("/settings");
  };
  const redirectContact = () => {
    history.push("/contact");
  };

  const { state } = useContext(AuthContext);
  useEffect(() => {
    return () => {};
  }, [state]);
  
  let match = useRouteMatch("");

  if (match.isExact === true || state.isAuthenticated === false) {
    return <div></div>;
  }  else {
    return (
      <div className="navBar">
        <ButtonNav
          className="navBar-contact"
          name="Contact"
          onClick={redirectContact}
        />
        <ButtonNav
          className="navBar-hebergement"
          name="Annonces Hébergements"
          onClick={redirectHebergements}
        />
        
        {/* <ButtonNav className="navBar-annonces" name="Petites Annonces" /> */}
        <ButtonNav
          className="navBar-profil"
          name="Settings"
          onClick={redirectSettings}
        />
        
        <ButtonLogout
        formeLogout="logout"
        name="&#9099;"
        />
      </div>
    );
  }
}
