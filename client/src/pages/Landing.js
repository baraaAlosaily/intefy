import React from "react";
import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import {Logo} from "../components"
const Landing = () => {
  return (
    <Wrapper>
      <nav >
          <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            interview <span>tracking</span> app
          </h1>
          <p>
            I'm baby edison bulb viral prism mlkshk tbh +1 raw denim food truck
            tofu before they sold out narwhal copper mug. Austin wayfarers hella
            bushwick live-edge cray polaroid pop-up. Farm-to-table squid plaid
            seitan, food truck snackwave tumeric chillwave. Chia hoodie subway
            tile ramps meh,
          </p>
          <Link to="/register" className="btn btn-hero">Login/Register</Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
