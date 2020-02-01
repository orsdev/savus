import React, { Fragment, useState } from 'react'
import YupError from '../../components/yupErrorHelper';
import Spinner from '../Spinner/Spinner';
import MessagePopup from './MessagePopup';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../../config/fbConfig';

//form validation with Yup
const validationShema = Yup.object().shape({
 email: Yup
  .string()
  .email("Email must be valid.")
  .required("Field can't be empty."),

 tel: Yup
  .number()
  .required("Field can't be empty."),

 address: Yup
  .string()
  .min(5, "Character must be greater than 4.")
  .max(255, "Character must be lesser than 255.")
  .required("Field can't be empty."),

 dob: Yup
  .date()
  .required("Select your DOB."),

 password: Yup
  .string()
  .min(6, "Character must be greater than 5.")
  .max(20, "Character must be lesser than 20.")
  .required("Field can't be empty."),

 security_one: Yup
  .string()
  .min(3, "Character must be greater than 2.")
  .max(50, "Character must be lesser than 50.")
  .required("Field can't be empty."),

 security_two: Yup
  .string()
  .min(3, "Character must be greater than 2.")
  .max(50, "Character must be lesser than 50.")
  .required("Field can't be empty."),

 security_three: Yup
  .string()
  .min(3, "Character must be greater than 2.")
  .max(50, "Character must be lesser than 50.")
  .required("Field can't be empty.")
})

const SignupPopup = (props) => {

 const [error, updateError] = useState(null);
 const [isSuccessful, updateisSuccessful] = useState(null);
 const [spinner, updateSpinner] = useState(null);
 const [message, updateMessage] = useState('');
 const [image, updateImage] = useState(null);



 async function onRegister(values, file) {
  try {

   await firebase.signUp(values.email, values.password);

   firebase.userInfo(values, file)
    .then(function () {
     //update states
     updateisSuccessful(true);
     updateError(null);
     updateSpinner(null);
     updateMessage('Account created successfully. Login to see your profile');

    }).catch(function () {
     //update state
     updateError(error.message);
     ;
    })

  } catch (error) {
   //update state
   updateError(error.message);
  }
 }

 const changeHandler = (e) => {
  if (e.target.files) {
   updateImage(e.target.files[0]);
  }
 }


 //variables to hold error & spinner, message popup later
 let popupError, showSpinner, successMessage;

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

 if (isSuccessful) {
  successMessage = <MessagePopup
   message={message} />
 }

 return (
  <Fragment>
   {popupError}
   {showSpinner}
   {successMessage}
   <div
    className="signup-container">
    <header
     className="signup-container-header">
     <h3
      className="sub-header">Create an Account</h3>
     <span
      className="closesignup close"
      onClick={props.timesClosePopup}>X</span>
    </header>
    <Formik initialValues={{
     email: "",
     tel: "",
     address: "",
     dob: "",
     password: "",
     security_one: "",
     security_two: "",
     security_three: "",
    }}

     validationSchema={validationShema}
     onSubmit={(values) => {

      //call function
      onRegister(values, image);
      //updates state
      updateSpinner(true);

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
          type="text"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
         />
         <YupError
          touched={touched.email}
          message={errors.email} />
        </div>
        <div className="form-group">
         <input
          type="tel"
          name="tel"
          placeholder="Phone Number"
          value={values.tel}
          onChange={handleChange}
          onBlur={handleBlur} />
         <YupError
          touched={touched.tel}
          message={errors.tel} />
        </div>
        <div className="form-group">
         <input
          type="text"
          name="address"
          placeholder="Address"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur} />
         <YupError
          touched={touched.address}
          message={errors.address} />
        </div>
        <div className="form-group">
         <input
          type="date"
          name="dob"
          placeholder="Birthday"
          value={values.date}
          onChange={handleChange}
          onBlur={handleBlur} />
         <YupError
          touched={touched.dob}
          message={errors.dob} />
        </div>
        <div className="form-group">
         <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          onBlur={handleBlur} />
         <YupError
          touched={touched.password}
          message={errors.password} />
        </div>
        <div className="form-group">
         <input
          type="file"
          name="picture"
          onChange={changeHandler}
         />
        </div>
        <div className="form-group security">
         <h4>Security Questions</h4>
         <input
          type="text"
          name="security_one"
          placeholder="What was your childhood nickname?"
          value={values.security_one}
          onChange={handleChange}
          onBlur={handleBlur} />
         <YupError
          touched={touched.security_one}
          message={errors.security_one} />
         <input
          type="text"
          name="security_two"
          placeholder="What is the middle name of your best friend?"
          value={values.security_two}
          onChange={handleChange}
          onBlur={handleBlur} />
         <YupError
          touched={touched.security_two}
          message={errors.security_two} />
         <input
          type="text"
          name="security_three"
          placeholder="What is the title of your favorite song?"
          value={values.security_three}
          onChange={handleChange}
          onBlur={handleBlur} />
         <YupError
          touched={touched.security_three}
          message={errors.security_three} />
        </div>
        <div className="form-group">
         <input
          type="submit"
          value="Register" />
        </div>
        <div className="toggleModal">
         <a href="#" id="login"
          className="login"
          onClick={props.loginPopup}>
          Already have an account?<strong> Sign in here!</strong>
         </a>
        </div>
       </form>
      )}
    </Formik>
   </div>

  </Fragment >
 )
}

export default SignupPopup;