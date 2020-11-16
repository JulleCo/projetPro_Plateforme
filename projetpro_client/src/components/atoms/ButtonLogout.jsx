import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../App";

export function ButtonLogout({formeLogout, name}) {
  const { state, dispatch } = useContext(AuthContext);
  let history = useHistory();

  const logout = () => {
    return (
      dispatch({ type: "LOGOUT" }),
      history.push("./")
      )
  };
  useEffect(() => {
    return () => {};
  }, [state]);

  return (
    <>
      <button className={`btn-menu-all ${formeLogout}`} type="button" onClick={logout}>
  {name}      
      </button>
    </>
  );
}
