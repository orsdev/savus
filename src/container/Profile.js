import React, { useEffect, useState, Fragment } from 'react';
import MessagePopup from '../UI/Popup/MessagePopup';
import Logo from '../img/logo.png';
import firebase from '../config/fbConfig';

const Profile = (props) => {

 const [email, updateEmail] = useState('');
 const [userId, updateUserId] = useState(null);
 const [label, updateLabel] = useState(null);
 const [value, updateValue] = useState(null);
 const [imageLink, updateImageLink] = useState(null);
 const [message, updateMessage] = useState('');


 async function getUserInfo() {

  //get saved user details
  const user = await firebase.getUserInfo()
   .catch(function (err) {
    console.log('error dey o')
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

 useEffect(() => {
  //check if user is logged in
  firebase.getUserState().then(function (user) {
   if (user) {
    //update state
    updateEmail(user.email);
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

 }, []);

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

 let userInfo,
  messagePopup;

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

 if (message) {
  messagePopup = (
   <MessagePopup
    message={message} />
  )
 }

 return (
  <Fragment>
   {messagePopup}
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
     <div className="profile__user">
      {userInfo}
      <div className="form-group">
       <button
        onClick={props.toggleSignupPopup}>Edit</button>
      </div>
     </div>
    </div>
   </div>
  </Fragment>
 )
}

export default Profile;