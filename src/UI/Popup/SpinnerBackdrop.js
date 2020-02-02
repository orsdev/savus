import React from 'react';

const SpinnerBackdrop = (props) => {
 return (
  <div
   className="spinnerbackdrop" >
   {props.children}
  </div>
 )
}
export default SpinnerBackdrop;