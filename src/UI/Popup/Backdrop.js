import React from 'react';

const Backdrop = (props) => {
 return (
  <div 
  className="backdrop" 
  onClick={ props.backdropClosePopup }>
   {props.children}
  </div>
 )
}
export default Backdrop;