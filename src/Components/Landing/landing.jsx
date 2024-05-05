import React from "react";
import "./LandingPage.css"; 
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <Link to={"pokemon"}>Pulsa click para continuar</Link>
    </div>
  );
};

export default LandingPage;
