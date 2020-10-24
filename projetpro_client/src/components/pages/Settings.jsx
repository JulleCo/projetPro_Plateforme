import React from "react";
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import { UserAnnonce } from "../organisms/UserAnnonce";
import { useState } from "react";

export function Settings(props) {
const [settingsType, setSettingsType]=useState(true)

// const onClick 

  return (
    <>
      <div>
        <ToggleButtonGroup
          exclusive
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned">
            <p>test</p>
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered">
            <p>test</p>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {/* <UserProfil /> */}
      <UserAnnonce />
    </>
  );
}
