import React, { Fragment } from 'react'
import Backdrop from '../UI/Backdrop';

const SignupPopup = (props) => {
 return (
  <Fragment>
   <Backdrop closePopup={ props.closePopup }>
    <div className="signup-container">
     <h3 className="sub-header">Create an Account</h3>
     <span className="closesignup close" onClick={ props.closePopup }>X</span>
     <form>
      <div className="form-group">
       <input type="email" name="signup-email" placeholder="Email" required />
      </div>
      <div className="form-group">
       <input type="tel" name="signup-tel" placeholder="Phone Number" />
      </div>
      <div className="form-group">
       <input type="text" name="signup-address" placeholder="Address" required />
      </div>
      <div className="form-group">
       <input type="date" name="signup-date" placeholder="Birthday" required />
      </div>
      <div className="form-group">
       <input type="password" name="signup-password" placeholder="Password" required />
      </div>
      <div className="form-group">
       <input type="password" name="signup-cpassword" placeholder="Confirm Password" required />
      </div>
      <div className="form-group security">
       <h4>Security Questions</h4>
       <input type="text" name="security_one" placeholder="What was your childhood nickname?" required />
       <input type="text" name="security_two" placeholder="What is the middle name of your best friend?" required />
       <input type="text" name="security_three" placeholder="What is the title of your favorite song?" required />
      </div>
      <div className="form-group">
       <input type="submit" name="signup-submit" value="Register" />
      </div>
      <div className="toggleModal">
       <a href="#" id="login" 
       className="login"
       onClick= { props.toggleLoginPopup }>
       Already have an account?<strong> Sign in here!</strong>
      </a>
      </div>

     </form>
    </div>
   </Backdrop>
  </Fragment>
 )
}

export default SignupPopup;