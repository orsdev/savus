import React, { Fragment } from 'react';
import Profile from './Profile';
import Homepage from './Homepage';
import Footer from '../components/sections/Footer';
import '../css/style.css';
import { Switch, Route } from 'react-router-dom';

const Savus = () => {

 return (
  <Fragment>
   <Switch>
    <Route exact path="/" component={Homepage} />
    <Route path="/profile" component={Profile} />
   </Switch>
   <Footer />
  </Fragment>
 )
}


export default Savus;