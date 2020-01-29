import React, { Fragment } from 'react'
import Backdrop from '../UI/Backdrop';
import YupError from './yupErrorHelper';
import { Formik } from 'formik';
import * as Yup from 'yup';

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

 date: Yup
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

 return (
  <Fragment>
   <Backdrop
    closePopup={props.closePopup}>
    <div
     className="signup-container">
     <header
      className="signup-container-header">
      <h3
       className="sub-header">Create an Account</h3>
      <span
       className="closesignup close"
       onClick={props.closePopup}>X</span>
     </header>
     <Formik initialValues={{
      email: "",
      tel: "",
      address: "",
      date: "",
      password: "",
      security_one: "",
      security_two: "",
      security_three: "",
     }}
      validationSchema={validationShema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
       setSubmitting(true);
      }} >
      {({
       values,
       errors,
       touched,
       handleSubmit,
       handleChange,
       handleBlur,
       isSubmitting
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
           name="date"
           placeholder="Birthday"
           value={values.date}
           onChange={handleChange}
           onBlur={handleBlur} />
          <YupError
           touched={touched.date}
           message={errors.date} />
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
           value="Register"
           disabled={isSubmitting} />
         </div>
         <div className="toggleModal">
          <a href="#" id="login"
           className="login"
           onClick={props.toggleLoginPopup}>
           Already have an account?<strong> Sign in here!</strong>
          </a>
         </div>
        </form>
       )}
     </Formik>
    </div>
   </Backdrop>
  </Fragment >
 )
}

export default SignupPopup;