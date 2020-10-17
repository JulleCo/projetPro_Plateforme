import React, { useState } from "react";
import Axios from "axios";
import { useAlert } from "react-alert";
import { ButtonAction } from "../atoms/ButtonAction";
import { PlaceForm } from "../templates/PlaceForm";

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
      <PlaceForm props={createPlace} onChange={handleChange} />
      <ButtonAction className="placeForm_button" type="submit" name={name} />
    </form>
  );
}
