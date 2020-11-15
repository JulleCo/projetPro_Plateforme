import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../App";
import HomeAuth from "../organisms/HomeAuth";
import {HomePublic} from "../organisms/HomePublic";

export const HomePage = () => {
  const { state } = useContext(AuthContext);
  console.log(state)
  useEffect(() => {
    return () => {};
  }, [state]);

  if (state.isAuthenticated === true) {
    return (
      <>
        <HomeAuth />
      </>
    );
  }
  return (
    <>
      <HomePublic />
    </>
  );
};
