import React from 'react';
import Spinner from '../Spinner/Spinner';
import './Footer.css';

const Footer = () => {
  return ( 
    <div className="Footer">
          <p className="FooterText"> Made in </p>
          <Spinner />
          <p className="FooterText">by Daniel Agostinho</p>
        </div>
   );
}
 
export default Footer;