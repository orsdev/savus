import React, { Fragment, Component } from 'react'
import firebase from '../config/fbConfig';
import { withRouter } from 'react-router-dom';
import Header from '../components/sections/Header';
import About from '../components/sections/About';
import Backdrop from '../UI/Popup/Backdrop';
import SignupPopup from '../UI/Popup/SignupPopup';
import LoginPopup from '../UI/Popup/LoginPopup';

class Homepage extends Component {


 state = {
  loginPopup: null,
  signupPopup: null,
  toggleClass: true
 }

 componentWillMount() {
  //check if user is logged in
  firebase.getUserState().then((user) => {
   if (user) {
    //redirect to profile if user logged in already
    this.props.history.replace('/profile');
   }
  })


 }


 componentDidUpdate(prevProps, prevState) {
  /*
  add a class to body element if toggleClass state changes
  */
  if (prevState.toggleClass !== this.state.toggleClass) {
   document.body.classList.toggle('noScroll');
  }
 }

 loginPopup = () => {
  let toggle = !this.state.toggleClass;
  this.setState({
   loginPopup: true,
   signupPopup: null,
   toggleClass: toggle
  })
 }

 signupPopup = () => {
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
    <Backdrop
     backdropClosePopup={this.closePopup}>
     <LoginPopup
      signupPopup={this.signupPopup}
      timesClosePopup={this.closePopup} />
    </Backdrop>
   );
  }

  // //show sigup popup if true
  if (this.state.signupPopup) {
   popupSignup = (
    <Backdrop
     backdropClosePopup={this.closePopup} >
     <SignupPopup
      loginPopup={this.loginPopup}
      timesClosePopup={this.closePopup} />
    </Backdrop>
   );
  }

  return (
   <Fragment>
    {popupLogin}
    {popupSignup}
    <Header
     loginPopup={this.loginPopup}
     signupPopup={this.signupPopup}
    />
    <About />
   </Fragment>
  )
 }
}

export default withRouter(Homepage);