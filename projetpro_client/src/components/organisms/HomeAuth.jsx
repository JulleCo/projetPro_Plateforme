import React from "react";
import ButtonMenu from "../atoms/ButtonMenu";

export default function HomeAuth(props) {


  return (
    <div className="homeAuth">
      <ButtonMenu
        className="homeAuth-hebergement"
        buttonType="rectangleVerti"
        name="Annonces d'Hébergement"
      />
      <div className="homeAuth-rightSide">
      <ButtonMenu
        className="homeAuth-profil"
        buttonType="carré"
        name="Profil"
      />
      <ButtonMenu
        className="homeAuth-annonces"
        buttonType="carré"
        name="Petites Annonces"
      />
      </div>
      <ButtonMenu
        className="homeAuth-documents"
        buttonType="carré"
        name="Documents"
      />
      <ButtonMenu
        className="homeAuth-contact"
        buttonType="carré"
        name="Contact"
      />
    </div>
  );
}
