import React from 'react'
import Logo from '../img/logo.png';
import defaultPic from '../img/default.png';

const Profile = (props) => {
 return (
  <div className="profile">
   <nav className="header__nav">
    <a href="#" className="header__nav-logo">
     <img src={Logo} alt="savus-logo" />
    </a>
    <div className="header__nav-link">
     <ul>
      <li>Logout</li>
     </ul>
    </div>
   </nav>
   <div className="profile__bg">
    <h1 className="main-header"> Profile </h1>
   </div>
   <div className="profile__details">
    <div className="profile__details-pic">
     <img src={defaultPic} alt="user_pic" />
    </div>
    <div className="profile__user">
     <div className="form-group">
      <p className="label">Email:</p>
      <p className="formval">Samuel@yahoo.com</p>
     </div>
     <div className="form-group">
      <p className="label">Phone:</p>
      <p className="formval">08033444364</p>
     </div>
     <div className="form-group">
      <p className="label">Address:</p>
      <p className="formval">N0 21, gbenga oguntade's street ipaja lagos</p>
     </div>
     <div className="form-group">
      <p className="label">Date of Birth:</p>
      <p className="formval">10/3/1002</p>
     </div>
     <div className="form-group">
      <p className="label">Childhood Nickname:</p>
      <p className="formval">Samoogbe</p>
     </div>
     <div className="form-group">
      <p className="label">Best Friend Middle Name:</p>
      <p className="formval">Akies</p>
     </div>
     <div className="form-group">
      <p className="label">Favorite Song Title:</p>
      <p className="formval">Tubaba </p>
     </div>
     <div className="form-group">
      <button
      onClick={ props.toggleSignupPopup }>Edit</button>
     </div>
    </div>
   </div>
  </div>
 )
}

export default Profile;