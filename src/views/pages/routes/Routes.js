import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom' 


// const Login = React.lazy(() => import('../login/Login'))
// const Register = React.lazy(() => import('../register/Register'))
// const Page404 = React.lazy(() => import('../page404/Page404'))

import Login from '../login/Login'
import Page404 from '../page404/Page404'

function Routes() {
    return(
        <div>
            <Switch>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route>
                    <Page404/>
                </Route>

            </Switch>
        </div>
    )
}

export default Routes