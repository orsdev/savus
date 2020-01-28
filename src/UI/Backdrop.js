import React from 'react';

const Backdrop = (props) => {
 return (
  <div className="backdrop" onClick={ props.closePopup }>
   {props.children}
  </div>
 )
}
export default Backdrop;