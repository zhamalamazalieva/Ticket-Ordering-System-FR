import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './scss/style.scss';
import Routes from './views/pages/routes/Routes.js';
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './redux/action/authAction';


const App = () => {

  const isUserLoading = useSelector(state => state.auth.isUserLoading)

  const dispatch = useDispatch();

useEffect(() => {
  dispatch(loadUser());
}, []);



return (
  <Router>
    {isUserLoading ? <div>...loading</div> :<Routes/> }
  </Router>
)}

export default App
