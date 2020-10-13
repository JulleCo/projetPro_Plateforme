import React from "react";
import { UserAnnonce } from "../organisms/UserAnnonce";

export function Settings(props) {


  return (
    <>
    <div> bouton toggle ==>>  profil | créer une annonce | mes annonces</div>
      {/* <UserProfil /> */}
      <UserAnnonce />
    </>
  );
}
