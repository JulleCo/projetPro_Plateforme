import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import HyperModal from "react-hyper-modal";

import ButtonMenu from "../atoms/ButtonMenu";
import { Contact } from "../pages/Contact";

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
          name="Settings"
          onClick={redirectSettings}
        />
        <ButtonMenu
          className="homeAuth-rightSide-annonces"
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
        onClick={openModal}
      />

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
