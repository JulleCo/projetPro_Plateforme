import React from "react";
import { useHistory } from "react-router-dom";
import ButtonMenu from "../atoms/ButtonMenu";

export const HomePublic = () => {
  let history = useHistory();

  const redirectInscription = () => {
    history.push("/inscription");
  };
  const redirectConnexion = () => {
    history.push("/connexion");
  };
  const redirectContact = () => {
    history.push("/contact");
  };

  return (
    <div className="homePublic">
      <ButtonMenu
        className="homePublic-connexion"
        buttonType="connexion"
        name="Connexion"
        onClick={redirectConnexion}
      />
      <div className="homePublic-presentation">
        <h3 className="homePublic-presentation-title">Présentation</h3>
        <p className="homePublic-presentation-content">
          Pour accéder à la PLATEFORME veuillez vous connecter. <br/> <br/> Si vous n'avez pas d'identifiants de connexion, veuillez prendre contact avec les administrateurs/ices de la PLATEFORME avant d'essayer de vous inscrire.
        </p>
      </div>
      <div className="homePublic-buttons">
        <ButtonMenu buttonType="carré" name="Contact" onClick={redirectContact}/>
        <ButtonMenu buttonType="carré" name="Inscription" onClick={redirectInscription}/>
      </div>
    </div>
  );
};
