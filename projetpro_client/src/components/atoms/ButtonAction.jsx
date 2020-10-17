import React from "react";

export function ButtonAction({ name = "", type = "submit" || "button", onClick = () => {} }) {
  return (
    <>
      <button className="actionBtn" type={type} onClick={onClick}>
        {name}
      </button>
    </>
  );
}
