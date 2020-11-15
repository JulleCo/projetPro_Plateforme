import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../App";

export function ButtonLogout() {
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
      <button className="btn-menu-all logout" type="button" onClick={logout}>
        &#9099;      
      </button>
    </>
  );
}
