import React from 'react';

import ReactIconBlue from "./../../assets/ReactBlue.png";

import './Footer.css';

const Footer = () => {
  return ( 
    <div className="Footer">
          <p className="FooterText"> Made in </p>
          <img className="ReactIcon" src={ReactIconBlue} alt="Spinning React Logo"/>
          <p className="FooterText">by Daniel Agostinho</p>
        </div>
   );
}
 
export default Footer;