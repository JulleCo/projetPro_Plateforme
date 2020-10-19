import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { ButtonAction } from "../atoms/ButtonAction";
// import PlaceCard from "../molecules/placeCard";
import { PlaceForm } from "../templates/PlaceForm";

export function PlaceFormDelete({ setIsOpen, dataPlace }) {
  const token = localStorage.getItem("token");
  const alert = useAlert();
  const history = useHistory();

  const [deletePlace, setDeletePlace] = useState({
    type: dataPlace.type,
    location: dataPlace.location,
    animaux: dataPlace.animaux,
    personMax: dataPlace.personMax,
    description: dataPlace.description,
    picture: dataPlace.picture,
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
      console.log("result fecth delete =>>", result);

      if (result.status === 200) {
        console.log("modif place delete ? =>> ", deletePlace);

        return (
            setIsOpen(false),
            history.push("./settings"),
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
      <h3>Voulez-vous vraiment supprimer ?</h3>
      <form
        deletePlace={deletePlace}
        key={deletePlace.id}
        className="placeForm"
        method="DELETE"
        action="/places"
        onSubmit={handleSubmit}
      >
        {/* <input>
          <PlaceCard place={dataPlace} />
        </input> */}

        <PlaceForm props={deletePlace} />

        <ButtonAction
          className="placeForm_buttonModif"
          type="submit"
          name="Supprimer"
        />
      </form>
    </>
  );
}
