import React, { Component } from 'react';
import firebase from '../config/fbConfig';

class UpdateProfile extends Component {

 state = {
  email: '',
  tel: '',
  address: '',
  dob: '',
  security_one: '',
  security_two: '',
  security_three: '',
 }

 //listen for inputs onchange events
 changeHandler = (e) => {
  if (e.target.value !== '') {
   this.setState({
    [e.target.name]: e.target.value
   });
  }

 };

 onSubmitForm = (e) => {
  e.preventDefault();

  /*
    Update user info if input
    field is not blank
    */

  if (this.state.email) {
   firebase.emailUpdate(this.props.id, this.state.email);
  }

  //number only for telephone input field
  let regexno = /^\+?\d/gi;

  if (this.state.tel && regexno.test(this.state.tel)) {
   firebase.updatePhone(this.props.id, this.state.tel);
  }

  if (this.state.address) {
   firebase.updateAddress(this.props.id, this.state.address);
  }

  if (this.state.dob) {
   firebase.updateDob(this.props.id, this.state.dob);
  }

  if (this.state.security_one) {
   firebase.updateSecurityOne(this.props.id, this.state.security_one);
  }

  if (this.state.security_two) {
   firebase.updateSecurityTwo(this.props.id, this.state.security_two);
  }

  if (this.state.security_three) {
   firebase.updateSecurityThree(this.props.id, this.state.security_three);
  }

 }

 render() {
  return (
   <div
    className="update-container">
    <header
     className="signup-container-header">
     <h3
      className="sub-header">Update Your Profile</h3>
    </header>
    <form onSubmit={this.onSubmitForm}>
     <div className="form-group">
      <input
       type="email"
       name="email"
       placeholder="Email"
       onChange={this.changeHandler} />
     </div>
     <div className="form-group">
      <input
       type="tel"
       name="tel"
       placeholder="Phone Number"
       onChange={this.changeHandler} />
     </div>
     <div className="form-group">
      <input
       type="text"
       name="address"
       placeholder="Address"
       onChange={this.changeHandler} />
     </div>
     <div className="form-group">
      <input
       type="date"
       name="dob"
       placeholder="Birthday"
       onChange={this.changeHandler} />
     </div>
     <div className="form-group security">
      <h4>Security Questions</h4>
      <input
       type="text"
       name="security_one"
       placeholder="What was your childhood nickname?"
       onChange={this.changeHandler} />
      <input
       type="text"
       name="security_two"
       placeholder="What is the middle name of your best friend?"
       onChange={this.changeHandler} />
      <input
       type="text"
       name="security_three"
       placeholder="What is the title of your favorite song?"
       onChange={this.changeHandler} />
     </div>
     <div className="form-group">
      <input
       type="submit"
       value="Update Profile" />
     </div>
    </form>
   </div>
  )
 }
}


export default UpdateProfile;