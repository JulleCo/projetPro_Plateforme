import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { UserAnnonce } from "../organisms/UserAnnonce";
import { UserProfil } from "../organisms/UserProfil";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  test:{
    backgroundColor:"#91762d",
    height: "35px",
    marginBottom: "10px",
  },
}))

export function Settings(props) {
  let [toggleBtn, setToggleBtn] = useState(true);


  const classes = useStyles()

  return (
    <div className="settings">
      <div className="settings_toggle">
        <ToggleButtonGroup
          exclusive
          aria-label="text alignment"
          className={`settings_toggle-grp ${classes.test}`}
        >
          <ToggleButton
            className="settings_toggle-grp-btn"
            value="left"
            aria-label="left aligned"
            onClick={() => {
              setToggleBtn(false);
            }}
          >
            <p>Profil</p>
          </ToggleButton>
          <ToggleButton
            className="settings_toggle-grp-btn"
            value="center"
            aria-label="centered"
            onClick={() => {
              setToggleBtn(true);
            }}
          >
            <p>Mes annonces</p>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="settings_componentMobile">
        {toggleBtn ? <UserAnnonce /> : <UserProfil />}
      </div>
      <div className="settings_componentDesktop">
        <div className="settings_componentDesktop-profil"> <UserProfil /> </div>
        <div className="settings_componentDesktop-annonce"> <UserAnnonce /> </div>
      </div>
    </div>
  );
}
