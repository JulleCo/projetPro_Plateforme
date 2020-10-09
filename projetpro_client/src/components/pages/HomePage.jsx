import React, { useContext } from "react";
import { AuthContext } from "../../App";
import HomeAuth from "../organisms/HomeAuth";
import { HomePublic } from "../organisms/HomePublic";

export const HomePage = () => {
  const HomeComponent = (props) => {
    const { state, dispatch } = useContext(AuthContext);

    if (state.isAuthenticated) {
      return <HomeAuth />;
    }
    return <HomePublic />;
  };

  return (
    <div className="homePage">
      <HomeComponent />
    </div>
  );
};
