import Axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { ButtonAction } from "../atoms/ButtonAction";
import { InputField } from "../atoms/InputField";

export function PlaceForm({ dataPlace, name }) {
  const token = localStorage.getItem("token");
  const alert = useAlert();

  let [modifPlace, setModifPlace] = useState({
    type: dataPlace.type,
    location: dataPlace.location,
    animaux: dataPlace.animaux,
    personMax: dataPlace.personMax,
    description: dataPlace.description,
    picture: dataPlace.picture,
    isSubmitting: false,
    errorMessage: null,
  });

  const handleChange = (event) => {
    setModifPlace({ ...modifPlace, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setModifPlace({
        ...modifPlace,
        isSubmitting: true,
      });
      const result = await Axios({
        method: "patch",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `http://localhost:1234/places/placeid=${dataPlace.id}`,
        data: JSON.stringify(modifPlace),
      });
      console.log("result fecth patch =>>", result);

      if (result.status === 200) {
        console.log("modif place update ? =>> ", modifPlace);

        return alert.show("Annonce modifiée !");
      }
    } catch (error) {
      setModifPlace({
        ...modifPlace,
        isSubmitting: false,
        errorMessage: error.response.data.description,
      });
    }
  };

  return (
    <>
      <form
        modifPlace={modifPlace}
        key={modifPlace.id}
        className="placeForm"
        method="PATCH"
        action="/places"
        onSubmit={handleSubmit}
      >
        <div className="placeForm_type">
          <p>
            Type d'hébergment proposé: canapé, chambre, matelat, appart
            entier...
          </p>
          <InputField
            type="text"
            name="type"
            id="type"
            value={modifPlace.type}
            onChange={handleChange}
          />
        </div>
        <div className="placeForm_location">
          <p>Localisation :</p>
          <InputField
            type="text"
            name="location"
            id="location"
            value={modifPlace.location}
            onChange={handleChange}
          />
        </div>
        <div className="placeForm_animaux">
          <p>Avez-vous des animaux ?</p>
          <InputField
            type="text"
            name="animaux"
            id="animaux"
            value={modifPlace.animaux}
            onChange={handleChange}
          />
        </div>
        <div className="placeForm_personMax">
          <p>Nombre de personne maximum possible pour l'accueil:</p>
          <InputField
            type="text"
            name="personMax"
            id="personMax"
            value={modifPlace.personMax}
            onChange={handleChange}
          />
        </div>
        <div className="placeForm_description">
          <p>Description libre, conditions, modalités...</p>
          <InputField
            type="text"
            name="description"
            id="description"
            value={modifPlace.description}
            onChange={handleChange}
          />
        </div>
        <div className="placeForm_picture">
          <p>Url d'une image :</p>
          <InputField
            type="text"
            name="picture"
            id="picture"
            value={modifPlace.picture}
            onChange={handleChange}
          />
        </div>
        <div>{modifPlace.errorMessage}</div>
        <ButtonAction className="placeForm_button" name={name} />
      </form>
    </>
  );
}
