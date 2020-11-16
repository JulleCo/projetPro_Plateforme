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
            • Hérbegement proposé par: {place.User.firstName}
            <br />
            <br />• Type de lieu:
            <br /> &thinsp; &thinsp; {place.type}
            <br />
            <br />• Localisation: {place.location}
            <br />
            <br />• {place.personMax} personne(s) max
          </p>
        </div>

        <div className="placeCard-link-infos">
          <p className="placeCard-link-infos-type" key={place.id}>
            • Information description :<br />
            &thinsp; &thinsp; &gt; {place.description}
            <br/> <br/>

            Pour plus d'informations cliquez sur l'annonce
          </p>
        </div>
      </div>
    </div>
  );
}
