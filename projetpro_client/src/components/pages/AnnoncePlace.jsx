import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function AnnoncePlace() {
  const [place, setPlace] = useState({});
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(
        `http://localhost:1234/places/placeid=${id}`
      );
      // console.log(result)

      setPlace(result.data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="annoncePlace">
      <Link to={"/hebergements"}>..BACK TO THE LIST</Link>
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
