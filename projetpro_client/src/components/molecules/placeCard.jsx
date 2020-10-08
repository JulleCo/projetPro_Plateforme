import React from "react";
import { Link } from "react-router-dom";

export default function PlaceCard({ place }) {
  return (
    <div className="placeCard">
      <Link className="placeCard-link" to={`/hebergements/${place.id}`}>
        <div className="placeCard-link-image">
          <img
            className="placeCard-link-image-place"
            src="https://kenleephotography.files.wordpress.com/2015/09/7169kenlee-2015_arizona-30sf32iso640-toweringsaguarosstartrails-66andahalfmintotal-133layerstotal-1000px.jpg"
            alt="aperçu du lieu"
          />
        </div>

        <div className="placeCard-link-infos">
          <p className="placeCard-link-infos-type" key={place.id}>
            Type de lieu: {place.type} <br /> <br />
            {place.description}
          </p>
          <p className="placeCard-link-infos-details">
            • {place.personMax} personne(s) max
            <br /> • Animaux: {place.animaux}
            <br />• {place.location}
          </p>
        </div>
      </Link>
    </div>
  );
}
