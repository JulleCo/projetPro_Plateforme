import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="header">
        <Link className="header" to={"/"}>
        <h1>PLATEFORME</h1>
        </Link>
      </header>
    </>
  );
}
