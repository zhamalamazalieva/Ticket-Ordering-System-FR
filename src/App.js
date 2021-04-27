import React, { useEffect} from 'react';
import './scss/style.scss';
import Routes from './pages/routes/Routes.js';
import  { loadUser } from './redux/action/authAction'
import { useDispatch, useSelector} from 'react-redux'
import FullPageSpinner from './components/spinners/FullPageSpinner'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(loadUser())
  }, [])

  const isUserLoading = useSelector(state => state.auth.isUserLoading)

  return (
      <>
      { isUserLoading ? <FullPageSpinner/> : <Routes/> }
      </>

  )}

export default App
