import React, { Component, Fragment } from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Footer from '../components/Footer';
import LoginPopup from '../components/LoginPopup';
import SignupPopup from '../components/SignupPopup';

import '../css/style.css';

class Savus extends Component {

 state = {
  loginPopup: null,
  signupPopup: null,
  toggleClass: true
 }

 componentDidUpdate(prevProps, prevState) {
  /*
  add a class to body element if toggleClass state changes
  */
  if (prevState.toggleClass !== this.state.toggleClass) {
    document.body.classList.toggle('noScroll');
  }
 }
 
 toggleLoginPopup = () => {
  let toggle = !this.state.toggleClass;
  this.setState({
   loginPopup: true,
   signupPopup: null,
   toggleClass: toggle
  })
 }

 toggleSignupPopup = () => {
  let toggle = !this.state.toggleClass;
  this.setState({
   signupPopup: true,
   loginPopup: null,
   toggleClass: toggle
  });
 }

 closePopup = (e) => {
  let target = e.target;
  /*
  update state when backdrop or when
  closed button is clicked
  */
  if (target.classList.contains('backdrop') ||
   target.classList.contains('close')) {

   let toggle = !this.state.toggleClass;

   this.setState({
    // closePopup: true,
    loginPopup: null,
    signupPopup: null,
    toggleClass: toggle
   });
  }
 }

 render() {

  /*
  variables will later assigned 
  LoginPopup & SignupPopup components
  */
  let popupLogin, popupSignup;

  //show login popup if true
  if (this.state.loginPopup) {
   popupLogin = (
    <LoginPopup
     closePopup={this.closePopup}
     toggleSignupPopup={this.toggleSignupPopup} />
   );
  }


  //show sigup popup if true
  if (this.state.signupPopup) {
   popupSignup = (
    <SignupPopup
     closePopup={this.closePopup}
     toggleLoginPopup={this.toggleLoginPopup} />
   );
  }

  return (
   <Fragment>
    {popupLogin}
    {popupSignup}
    <Header
     toggleLoginPopup={this.toggleLoginPopup}
     toggleSignupPopup={this.toggleSignupPopup} />
    <About />
    <Footer />
   </Fragment>
  )
 }
}

export default Savus;