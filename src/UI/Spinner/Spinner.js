import React, { Fragment } from 'react';
import Backdrop from '../Popup/Backdrop';

const Spinner = (props) => {
 return (
  <Fragment>
   <Backdrop
    backdropClosePopup={props.errorClosePopup}>
    <div className="loader">
     <div className="sk-cube-grid">
      <div className="sk-cube sk-cube1"></div>
      <div className="sk-cube sk-cube2"></div>
      <div className="sk-cube sk-cube3"></div>
      <div className="sk-cube sk-cube4"></div>
      <div className="sk-cube sk-cube5"></div>
      <div className="sk-cube sk-cube6"></div>
      <div className="sk-cube sk-cube7"></div>
      <div className="sk-cube sk-cube8"></div>
      <div className="sk-cube sk-cube9"></div>
     </div>
    </div>
   </Backdrop>
  </Fragment>
 )
}


export default Spinner;