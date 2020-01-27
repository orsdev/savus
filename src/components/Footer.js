import React from 'react';
import Logo from '../img/logo.png';

const Footer = () => {
 return (
  <footer className="footer">
   <a href="#">
     <img src={Logo} alt="savus-logo" />
    </a>
    <small>&copy; copyright <strong>SAVUS</strong> 2020.</small>
  </footer>
 )
}

export default Footer;