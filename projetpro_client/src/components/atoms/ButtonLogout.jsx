import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../App";

export function ButtonLogout() {
  const { state, dispatch } = useContext(AuthContext);
  const logout = () => {
    return dispatch({ type: "LOGOUT" });
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
