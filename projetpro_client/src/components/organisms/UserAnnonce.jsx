import React from "react";
import { PlaceFormCreate } from "../molecules/PlaceFormCreate";
import { PlaceFormUD } from "../molecules/PlaceFormUD";

export function UserAnnonce(props) {
  return (
    <>
      <PlaceFormUD name="Modifier" />
      <PlaceFormCreate name="Valider" />
    </>
  );
}
