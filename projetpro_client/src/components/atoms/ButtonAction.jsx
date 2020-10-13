import React from "react";

export function ButtonAction({name=""}) {
  return (
    <>
      <button className="actionBtn" type="submit">
        {name}
      </button>
    </>
  );
}
