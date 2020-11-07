import React from "react";
import { useRouteMatch } from "react-router-dom";
import { PlaceFormCreate } from "../molecules/PlaceFormCreate";
import { PlaceFormUD } from "../molecules/PlaceFormUD";

export function UserAnnonce(props) {

    return (
      <>
        <PlaceFormCreate name="Valider" />
        <PlaceFormUD />
      </>
    );

}
