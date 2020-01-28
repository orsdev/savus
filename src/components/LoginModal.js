import React, { Fragment } from 'react'
import Backdrop from '../UI/Backdrop';

const LoginModal = (props) => {
 return (
  <Fragment>
   <Backdrop>
    <div className="login-container">
     <h3 className="sub-header">Login</h3>
     <span className="closelogin close">X</span>
     <form>
      <div className="form-group">
       <input type="email" name="login-email" placeholder="Email" required />
      </div>
      <div className="form-group">
       <input type="password" name="login-password" placeholder="Password" required />
      </div>
      <div className="form-group">
       <input type="submit" name="login-submit" value="Login" />
      </div>
      <div className="toggleModal">
       <a href="#" id="signup" className="signup">
        Need and account? <strong>Register here!</strong>
      </a>
      </div>

     </form>
    </div>
   </Backdrop>
  </Fragment>
 )
}

export default LoginModal;