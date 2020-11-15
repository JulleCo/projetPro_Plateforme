// import React from "react";
// import { PlaceFormCreate } from "../molecules/PlaceFormCreate";
import { PlaceFormUD } from "../molecules/PlaceFormUD";


import React, { useState } from "react";
import Axios from "axios";
import { useAlert } from "react-alert";
import { ButtonAction } from "../atoms/ButtonAction";
import { PlaceForm } from "../templates/PlaceForm";

export function UserAnnonce() {
  const token = localStorage.getItem("token");
  const alert = useAlert();

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

      if (result.status === 201) {
        return (
          setCreatePlace({
            type: "",
            location: "",
            animaux: "",
            personMax: "",
            description: "",
            picture: "",
          }),
          alert.show("Annonce publiée !")
        );
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
    <>
      {/* <PlaceFormCreate name="Valider" /> */}
      <form
      className="placeForm"
      method="POST"
      action="/places"
      onSubmit={handleSubmit}
    >
      <PlaceForm props={createPlace} onChange={handleChange} />
      <ButtonAction className="placeForm_button" type="submit" name="Valider" />
    </form>
      <PlaceFormUD />
    </>
  );
}
