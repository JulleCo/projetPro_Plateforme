import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function AnnoncePlace() {
  const token = localStorage.getItem("token");
  const [place, setPlace] = useState({});
  let { id } = useParams();
  const [error, setError] = useState(" ");

  useEffect(() => {
    const axiosData = async () => {
      try {
        const result = await Axios({
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          url: `http://localhost:1234/places/placeid=${id}`,
        });
        setPlace(result.data);
      } catch (error) {
        setError(error.response.data.error);
      }
    };
    axiosData();
  }, [id, token]);

  return (
    <div className="annoncePlace">
      <Link to={"/hebergements"}>..BACK TO THE LIST</Link>
      <div>{error}</div>
      <div className="annoncePlace-top">
        <img
          className="annoncePlace-top-image"
          src="https://kenleephotography.files.wordpress.com/2015/09/7169kenlee-2015_arizona-30sf32iso640-toweringsaguarosstartrails-66andahalfmintotal-133layerstotal-1000px.jpg"
          alt="aperçu du lieu"
        />
        <p className="annoncePlace-top-infos">
          • Type de lieu: {place.type} <br />• {place.personMax} personne(s) max
          <br /> • Animaux: {place.animaux}
          <br />• {place.location}
        </p>
      </div>
      <p className="annoncePlace-description" key={place.id}>
        {place.description}
      </p>
    </div>
  );
}
