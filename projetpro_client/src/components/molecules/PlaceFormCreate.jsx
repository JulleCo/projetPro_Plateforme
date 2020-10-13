import React, { useState } from "react";
import Axios from "axios";
import { useAlert } from "react-alert";
import { ButtonAction } from "../atoms/ButtonAction";
import { InputField } from "../atoms/InputField";

export function PlaceFormCreate({ name = "" }) {
  const token = localStorage.getItem("token");

  const [createPlace, setCreatePlace] = useState({
    type: null,
    location: null,
    animaux: null,
    personMax: null,
    description: null,
    picture: null,
    isSubmitting: false,
    errorMessage: null,
  });
  const alert = useAlert();

  const handleChange = (event) => {
    setCreatePlace({ ...createPlace, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setCreatePlace({
        ...createPlace,
        isSubmitting: true,
      });
      const result = await Axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: "http://localhost:1234/places",
        data: JSON.stringify(createPlace),
      });
      console.log(result);

      if (result.status === 200) {
        console.log(createPlace);

        return alert.show("Annonce publiée !");
      }
    } catch (error) {
      setCreatePlace({
        ...createPlace,
        isSubmitting: false,
        errorMessage: error.response.data.description,
      });
    }
  };

  return (
    <form
      className="placeForm"
      method="POST"
      action="/places"
      onSubmit={handleSubmit}
    >
      <div className="placeForm_type">
        <p>
          Type d'hébergment proposé: canapé, chambre, matelat, appart entier...
        </p>
        <InputField
          type="text"
          name="type"
          id="type"
          value={createPlace.type}
          onChange={handleChange}
        />
      </div>
      <div className="placeForm_location">
        <p>Localisation :</p>
        <InputField
          type="text"
          name="location"
          id="location"
          value={createPlace.location}
          onChange={handleChange}
        />
      </div>
      <div className="placeForm_animaux">
        <p>Avez-vous des animaux ?</p>
        <InputField
          type="text"
          name="animaux"
          id="animaux"
          value={createPlace.animaux}
          onChange={handleChange}
        />
      </div>
      <div className="placeForm_personMax">
        <p>Nombre de personne maximum possible pour l'accueil:</p>
        <InputField
          type="number"
          name="personMax"
          id="personMax"
          value={createPlace.personMax}
          onChange={handleChange}
        />
      </div>
      <div className="placeForm_description">
        <p>Description libre, conditions, modalités...</p>
        <InputField
          type="text"
          name="description"
          id="description"
          value={createPlace.description}
          onChange={handleChange}
        />
      </div>
      <div className="placeForm_picture">
        <p>Url d'une image :</p>
        <InputField
          type="text"
          name="picture"
          id="picture"
          value={createPlace.picture}
          onChange={handleChange}
        />
      </div>
      <div>{createPlace.errorMessage}</div>
      <ButtonAction className="placeForm_button" name={name} />
    </form>
  );
}
