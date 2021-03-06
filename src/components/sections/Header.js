import React, { Fragment } from 'react';
import Logo from '../../img/logo.png';

const Header = (props) => {
 return (
  <Fragment>
   <header className="header">
    <nav className="header__nav">
     <a href="#" className="header__nav-logo">
      <img src={Logo} alt="savus-logo" />
     </a>
     <div className="header__nav-link">
      <ul>
       <li onClick={props.loginPopup}>Login</li>
       <li onClick={props.signupPopup}>Sign up</li>
      </ul>
     </div>
    </nav>
    <div className="header__text">
     <h1 className="main-header">Welcome to <strong>SAVUS</strong></h1>
     <p className="para">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam error nemo fuga possimus modi? Cumque voluptatem consequuntur quia.
    </p>
    </div>
   </header>
  </Fragment>
 )
}

export default Header;