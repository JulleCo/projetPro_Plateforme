import React from "react";

export default function ButtonNav({ name, onClick = () => {} }) {
  return (
    <>
      <button className="btn-menu-all buttonNav" onClick={onClick}>{name}</button>
    </>
  );
}
