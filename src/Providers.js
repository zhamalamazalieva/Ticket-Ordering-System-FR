import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import PansionServiceContext from './context/PansionServiceContext'
import PansionService from './service/PansionService'
import { Provider } from 'react-redux'
import store from './redux/store'

export default function Providers({ children}) {
    return(
        <BrowserRouter>
            <PansionServiceContext.Provider value={new PansionService()}>
                <Provider store={store}>
                    { children }
                </Provider>
            </PansionServiceContext.Provider>
        </BrowserRouter>
    )
}