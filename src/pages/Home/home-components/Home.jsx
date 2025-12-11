import React from "react";
import Hero from "./Hero";
import AvailableLoan from "./AvailableLoan";
import HowItWorks from "./HowItWorks";
import FeedBack from "./FeedBack";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <AvailableLoan></AvailableLoan>
      <HowItWorks></HowItWorks>
      <FeedBack></FeedBack>
    </div>
  );
};

export default Home;
