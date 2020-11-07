import React, { useState } from "react";
import {
  Router,
  useRouteMatch,
  Route,
  Switch,
  useHistory,
  Link,
} from "react-router-dom";

import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { UserAnnonce } from "../organisms/UserAnnonce";
import { UserProfil } from "../organisms/UserProfil";

export function Settings(props) {
  let histories = useHistory();

  const redirectProfil = () => {
    histories.push("/settings/info-profil");
  };
  const redirectMyPosts = () => {
    histories.push("/settings/mes-annonces");
  };
  return (
    <div className="settings">
      <div className="toggle">
      <ToggleButtonGroup exclusive aria-label="text alignment" className="toggle">
        <ToggleButton
          className="toggle-btn"
          value="left"
          aria-label="left aligned"
          onClick={redirectProfil}
        >
          <p>Profil</p>
        </ToggleButton>
        <ToggleButton
          className="toggle-btn"
          value="center"
          aria-label="centered"
          onClick={redirectMyPosts}
        >
          <p>Mes annonces</p>
        </ToggleButton>
      </ToggleButtonGroup>
      </div>
      <UserAnnonce />

      {/* <Link to={redirectMyPosts}>Annonces</Link>
      <Link to={redirectProfil}>Profil</Link> */}

      {/* <Switch>
        <Route path={`${match.path}/profil`}>
          <p>hello</p>
          <UserProfil />
        </Route>
        <Route path={`${match.path}/mes-annonces`}>
          <UserAnnonce />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch> */}
    </div>
  );
}
