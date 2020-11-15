import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { ButtonAction } from "../atoms/ButtonAction";

export function PlaceFormDelete({ closeModale = () => {}, dataPlace }) {
  const token = localStorage.getItem("token");
  const alert = useAlert();
  const history = useHistory();

  const [deletePlace, setDeletePlace] = useState({
    ...dataPlace,
    isSubmitting: false,
    errorMessage: null,
  });
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setDeletePlace({
        ...deletePlace,
        isSubmitting: true,
      });
      const result = await Axios({
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `http://localhost:1234/places/placeid=${dataPlace.id}`,
        data: JSON.stringify(deletePlace),
      });
      if (result.status === 201) {
        console.log("annonce delete ? =>> ", deletePlace);

        return (
          closeModale(),
          history.push("./settings/mes-annonces"),
          alert.show("Annonce supprimée !")
        );
      }
    } catch (error) {
      setDeletePlace({
        ...deletePlace,
        isSubmitting: false,
        errorMessage: error.response.data.description,
      });
    }
  };

  return (
    <>
      <div className="annoncePlaceDelete">
        <h3>Voulez-vous vraiment supprimer ?</h3>

        <div>
          <p>Type d'hébergment :</p>
          <p>{deletePlace.type}</p>
        </div>
        <div>
          <p>Localisation :</p>
          <p>{deletePlace.location}</p>
        </div>
        <div>
          <p>Mes animaux :</p>
          <p>{deletePlace.animaux}</p>
        </div>
        <div>
          <p>Nombre de personne maximum possible pour l'accueil:</p>
          <p>{deletePlace.personMax}</p>
        </div>
        <div>
          <p>Description libre, conditions, modalités...</p>
          <p>{deletePlace.description}</p>
        </div>

        <ButtonAction
          className="annoncePlaceDelete_buttonDelete"
          type="submit"
          name="Supprimer"
          onClick={handleSubmit}
        />
      </div>
    </>
  );
}
