import React from "react";

export default function PlaceCard({ place }) {
  return (
    <div className="placeCard">
      <div className="placeCard-link">
        <div className="placeCard-link-image">
          <img
            className="placeCard-link-image-place"
            src={place.picture}
            alt="aperçu du lieu"
          />
          <p className="placeCard-link-image-details">
            • {place.personMax} personne(s) max
            <br /> • Animaux: {place.animaux}
            <br />• {place.location}
          </p>
        </div>

        <div className="placeCard-link-infos">
          <p className="placeCard-link-infos-type" key={place.id}>
            Type de lieu: {place.type} <br /> <br />
            {place.description}
          </p>
        </div>
      </div>
    </div>
  );
}
