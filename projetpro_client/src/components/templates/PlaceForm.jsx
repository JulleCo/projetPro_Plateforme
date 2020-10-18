import React from "react";
import { InputField } from "../atoms/InputField";

export function PlaceForm({props, onChange, disabled}) {
  return (
    <>
      <div className="placeForm_type">
        <p>
          Type d'hébergment proposé: canapé, chambre, matelat, appart entier...
        </p>
        <InputField
          type="text"
          name="type"
          id="type"
          value={props.type}
          onChange={onChange}

        />
      </div>
      <div className="placeForm_location">
        <p>Localisation :</p>
        <InputField
          type="text"
          name="location"
          id="location"
          value={props.location}
          onChange={onChange}
        />
      </div>
      <div className="placeForm_animaux">
        <p>Avez-vous des animaux ?</p>
        <InputField
          type="text"
          name="animaux"
          id="animaux"
          value={props.animaux}
          onChange={onChange}
        />
      </div>
      <div className="placeForm_personMax">
        <p>Nombre de personne maximum possible pour l'accueil:</p>
        <InputField
          type="number"
          name="personMax"
          id="personMax"
          value={props.personMax}
          onChange={onChange}
        />
      </div>
      <div className="placeForm_description">
        <p>Description libre, conditions, modalités...</p>
        <InputField
          type="text"
          name="description"
          id="description"
          value={props.description}
          onChange={onChange}
        />
      </div>
      <div className="placeForm_picture">
        <p>Url d'une image :</p>
        <InputField
          type="text"
          name="picture"
          id="picture"
          value={props.picture}
          onChange={onChange}
        />
      </div>
      <div>{props.errorMessage}</div>
    </>
  );
}
