import React, { Fragment, useState } from 'react'
import YupError from '../../components/yupErrorHelper';
import MessagePopup from './MessagePopup';
import Spinner from '../Spinner/Spinner';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../../config/fbConfig';
import { withRouter } from 'react-router-dom';

//form validation with Yup
const validationShema = Yup.object().shape({
 email: Yup
  .string()
  .email("Email must be valid.")
  .required("Field can't be empty."),

 password: Yup
  .string()
  .required("Field can't be empty."),
})

const LoginPopup = (props) => {


 const [error, updateError] = useState(null);
 const [spinner, updateSpinner] = useState(null);

 async function onLogin(values) {
  try {
   //update state
   updateSpinner(true)
   await firebase.login(values.email, values.password);

   //if login is successful, redirect to profile page
   props.history.replace('/profile');
  } catch (error) {
   //update state
   updateError(error.message)
  }
 }

 //variables for popups
 let popupError, showSpinner;

 //show error popup if theres is an error
 if (error) {
  popupError = <MessagePopup
   message={error} />
 }

 /* 
show spinner when spinner state
is true & error state is null
*/
 if (spinner && !error) {
  showSpinner = <Spinner />
 }


 return (
  <Fragment>
   {popupError}
   {showSpinner}
   <div className="login-container">
    <header className="login-container-header">
     <h3 className="sub-header">Login</h3>
     <span className="closelogin close" onClick={props.timesClosePopup}>X</span>
    </header>
    <Formik initialValues={{
     email: "",
     password: "",
    }}

     validationSchema={validationShema}
     onSubmit={(values) => {
      //call function
      onLogin(values);

     }} >
     {({
      values,
      errors,
      touched,
      handleSubmit,
      handleChange,
      handleBlur
     }) => (
       <form onSubmit={handleSubmit}>
        <div className="form-group">
         <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur} />
         <YupError
          touched={touched.email}
          message={errors.email} />
        </div>
        <div className="form-group">
         <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur} />
         <YupError
          touched={touched.password}
          message={errors.password} />
        </div>
        <div className="form-group">
         <input
          type="submit"
          name="login-submit"
          value="Login" />
        </div>
        <div className="toggleModal">
         <a href="#" id="signup"
          className="signup"
          onClick={props.signupPopup} >
          Need and account? <strong>Register here!</strong>
         </a>
        </div>
       </form>
      )}
    </Formik>
   </div>
  </Fragment>
 )
}

export default withRouter(LoginPopup);