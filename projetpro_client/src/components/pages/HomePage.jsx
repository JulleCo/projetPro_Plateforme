import React from "react";
import HomeAuth from "../organisms/HomeAuth"
import { HomePublic } from "../organisms/HomePublic";


export const HomePage = () => {
  const HomeComponent = (props) => {
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn){
      return <HomeAuth />
    }
    return <HomePublic />
  }
  
  return (
    <div className="homePage">
      <HomeComponent/>
    </div>
  );
};
