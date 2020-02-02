import React, { useEffect, useState, Fragment } from 'react';
import MessagePopup from '../UI/Popup/MessagePopup';
import SpinnerBackdrop from '../UI/Popup/SpinnerBackdrop';
import Spinner from '../UI/Spinner/Spinner';

import Logo from '../img/logo.png';
import firebase from '../config/fbConfig';
import UpdateProfile from './UpdateProfile';

const Profile = (props) => {


 const [userId, updateUserId] = useState(null);
 const [label, updateLabel] = useState(null);
 const [value, updateValue] = useState(null);
 const [imageLink, updateImageLink] = useState(null);
 const [message, updateMessage] = useState('');
 const [changeImage, updatechangeImage] = useState(false);

 useEffect(() => {
  //check if user is logged in
  firebase.getUserState().then(function (user) {
   if (user) {
    //call function
    getUserInfo();
   } else {
    //upadate state if user is not signed in
    updateMessage('Log in to view your profile');

    //wait, then redirect to home 
    setTimeout(function () {
     props.history.replace('/');
    }, 1500);

   }
  })
 }, [value]);

 useEffect(() => {
  //if noScroll class is on body element, remove
  if (document.body.classList.contains('noScroll')) {
   document.body.classList.remove('noScroll');
  }
 }, []);

 //log user out
 const logout = () => {
  firebase.logout();
  //redirect back to home
  props.history.replace('/');
 }

 //get user information from firebase
 async function getUserInfo() {

  //get saved user details
  const user = await firebase.getUserInfo()
   .catch(function (err) {
    //update state
    updateMessage(err);
   });


  if (user) {

   /*
    variables will hold values
    from firebase database later
    */
   let myLabel,
    myId,
    myValue,
    myImage;

   user.filter((val, index) => {
    //copy object
    const copyVal = { ...val.data };
    //remove media key
    delete copyVal.media;
    //extract user info
    myLabel = Object.keys(copyVal);
    myValue = Object.values(copyVal);
    myId = val.id;
    myImage = val.data.media.picture;
   });

   //update states
   updateLabel(myLabel);
   updateUserId(myId);
   updateImageLink(myImage);
   updateValue(myValue);
  }
 }

 const changePicture = (e) => {
  if (e.target.files) {
   //update state
   updatechangeImage(true);
   firebase.updateUserPicture(userId, e.target.files[0]).then(function () {
    //update state;
    updatechangeImage(false);
   }).catch(function (error) {
    //update state
    updatechangeImage(false);
   });
  }

 }

 let userInfo,
  messagePopup,
  imageSpinner;

 if (value && label) {
  userInfo = value.map((val, index) => {
   return (
    <Fragment key={index + val}>
     <div className="form-group">
      <p className="label">{label[index]}</p>
      <p className="formval">{val}</p>
     </div>
    </Fragment>
   )
  })
 }

 //show popup message if user is not signed in
 if (message) {
  messagePopup = (
   <MessagePopup
    message={message} />
  )
 }

 //spinner shows when uploading a new picture
 if (changeImage) {
  imageSpinner = (
   <SpinnerBackdrop>
    <Spinner />
   </SpinnerBackdrop>
  )
 }

 return (
  <Fragment>
   {messagePopup}
   {imageSpinner}
   <div className="profile">
    <nav className="header__nav">
     <a href="#" className="header__nav-logo">
      <img src={Logo} alt="savus-logo" />
     </a>
     <div className="header__nav-link">
      <ul>
       <li onClick={logout}>Logout</li>
      </ul>
     </div>
    </nav>
    <div className="profile__bg">
     <h1 className="main-header"> Profile </h1>
    </div>
    <div className="profile__details">
     <div className="profile__details-pic">
      <img src={imageLink} alt="user_pic" />
     </div>
     <div className="change-pic">
      <label className="file-label"> Change Picture
    <input
        type="file"
        onChange={changePicture} />
      </label>
     </div>
     <div className="profile__user">
      {userInfo}
     </div>
    </div>
   </div>
   <UpdateProfile
    id={userId} />
  </Fragment>
 )
}

export default Profile;