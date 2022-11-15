import React from 'react';

//INTERNAL IMPORT
import Style from '../styles/index.module.css';
import {BigNFTSilder, HeroSection, Service} from '../components/';
const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSilder />
    </div>
  );
};

export default Home;
