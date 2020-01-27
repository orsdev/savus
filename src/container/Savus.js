import React, { Component , Fragment } from 'react';
import Header from '../components/Header';
import About from '../components/About';
import '../css/style.css';

class Savus extends Component {

 render(){
  return (
   <Fragment>
    <Header />
    <About />
   </Fragment>
  )
 }
}

export default Savus;