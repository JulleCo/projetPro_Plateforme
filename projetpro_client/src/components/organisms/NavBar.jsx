import React from "react";
import { useHistory } from "react-router-dom";
import ButtonNav from "../atoms/ButtonNav";
import { useRouteMatch } from "react-router-dom";

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

  let match = useRouteMatch("");
  console.log(match)
  if (match.isExact === true) {
    return <div></div>;
  }  else {
    return (
      <div className="navBar">
        <ButtonNav
          className="navBar-hebergement"
          name="Annonces d'Hébergement"
          onClick={redirectHebergements}
        />
        <ButtonNav
          className="navBar-profil"
          name="Profil"
          onClick={redirectSettings}
        />
        <ButtonNav className="navBar-annonces" name="Petites Annonces" />
        <ButtonNav
          className="navBar-contact"
          name="Contact"
          onClick={redirectContact}
        />
      </div>
    );
  }
}
