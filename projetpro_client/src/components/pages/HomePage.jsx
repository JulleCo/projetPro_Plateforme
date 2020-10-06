import React from "react";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import { HomePublic } from "../organisms/HomePublic";

export const HomePage = () => {
  return (
    <div className="homePage">
      <Header />
      <HomePublic />
      <Footer />
    </div>
  );
};
