import Axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { ButtonAction } from "../atoms/ButtonAction";
import { PlaceForm } from "../templates/PlaceForm";
import { PlaceFormDelete } from "../molecules/PlaceFormDelete";
import HyperModal from "react-hyper-modal";

export function PlaceFormPatch({ dataPlace }) {
  const token = localStorage.getItem("token");
  const alert = useAlert();

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

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

      if (result.status === 201) {
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
    <div>
      <form
        key={modifPlace.id}
        className="placeForm"
        method="PATCH"
        action="/places"
        onSubmit={handleSubmit}
      >
        <img
          src={modifPlace.picture}
          alt="aperçu du lieu"
          className="placeForm_image"
        ></img>

        <PlaceForm props={modifPlace} onChange={handleChange} />

        <div>{modifPlace.errorMessage}</div>
        <div className="placeForm_button">
          <ButtonAction
            className="placeForm_button-Modif"
            type="submit"
            name="Modifier"
          />
          <ButtonAction
            className="placeForm_button-Delete"
            type="button"
            name="Supprimer"
            onClick={openModal}
          />
        </div>
      </form>
      <HyperModal
        isOpen={isOpen}
        requestClose={() => {
          setIsOpen(false);
        }}
      >
        <PlaceFormDelete
          closeModale={() => {
            setIsOpen(false);
          }}
          dataPlace={dataPlace}
        />
      </HyperModal>
    </div>
  );
}
