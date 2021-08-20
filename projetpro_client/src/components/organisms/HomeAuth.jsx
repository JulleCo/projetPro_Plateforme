import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import HyperModal from "react-hyper-modal";

import ButtonMenu from "../atoms/ButtonMenu";
import { Contact } from "../pages/Contact";
import { ButtonLogout } from "../atoms/ButtonLogout";

export default function HomeAuth(props) {
  let history = useHistory();

  const redirectHebergements = () => {
    history.push("/hebergements");
  };
  const redirectSettings = () => {
    history.push("/settings");
  };
  // const redirectContact = () => {
  //   history.push("/contact");
  // };

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="homeAuth">
      <ButtonMenu
        className="homeAuth-hebergement"
        buttonType="rectangleVerti"
        name="Annonces d'Hébergement"
        onClick={redirectHebergements}
      />
      <div className="homeAuth-rightSide">
        <ButtonMenu
          className="homeAuth-rightSide-profil"
          buttonType="carré"
          name="Paramètres"
          onClick={redirectSettings}
        />
        <ButtonMenu
        className="homeAuth-contact"
        buttonType="carré"
        name="Contact"
        onClick={openModal}
      />
        {/* <ButtonMenu
          className="homeAuth-rightSide-annonces"
          buttonType="carré"
          name="Petites Annonces"
        /> */}
      </div>

      <ButtonLogout
      formeLogout="homeAuth-documents carré"
      name="Déconnexion"
      />
      <a target="_blank" href="https://drive.google.com/drive/folders/1ZB6A88y57DCc8-PeFQ7_d_QBARhIKMFu?usp=sharing">
      <ButtonMenu
        className="homeAuth-documents"
        buttonType="carré"
        name="Documents"
      />
      </a>

      <HyperModal
        isOpen={isOpen}
        requestClose={() => {
          setIsOpen(false);
        }}
      >
        <Contact closeModale={() => {setIsOpen(false);}}/>
      </HyperModal>
    </div>
  );
}
