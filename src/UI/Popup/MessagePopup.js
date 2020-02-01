import React, { Fragment } from 'react';
import Backdrop from './Backdrop';

const MessagePopup = (props) => {

 const style = {
  textAlign: 'center',
  width: '300px',
  background: 'white',
  padding: '60px 30px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  fontWeight: 'bold',
  transform: 'translate3d(-50% , -50% , 0)'
 };

 return (
  <Fragment>
   <Backdrop
    backdropClosePopup={props.errorClosePopup}>
    <p style={style}>{props.message}</p>
   </Backdrop>
  </Fragment>
 )
}

export default MessagePopup;