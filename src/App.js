import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './scss/style.scss';
import Routes from './views/pages/routes/Routes.js';
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './redux/action/authAction';
import PansionServiceContext from "./context/PansionServiceContext"
import PansionService from "./service/PansionService"


const App = () => {
  
 

  const accesstoken = useSelector(state => state.auth.accesstoken)
  const isAuthenticated =  useSelector(state => state.auth.isAuthenticated)
  const isUserLoading = useSelector(state => state.auth.isUserLoading)
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);



return (
  <Router>
    <PansionServiceContext.Provider value={new PansionService()}>
      { isUserLoading ? <div>...</div> : <Routes/> }
    </PansionServiceContext.Provider>
  </Router>


)}

export default App
