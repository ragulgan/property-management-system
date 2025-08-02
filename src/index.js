/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
// import '@babel/polyfill'

// Import all the third party stuff
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import {
    LayoutProvider,
    LayoutSplashScreen
} from './theme/layout/core/index'

import {
    MetronicLayoutProvider,
    MetronicSplashScreenProvider,
    MetronicSubheaderProvider,
} from "./theme/theme-settings";

// Import root app
import { Routes } from './routing/Routes'
import './theme/assets/sass/style.scss'
import './theme/assets/sass/style.react.scss'
import './react-bootstrap-table-all.min.css';
import './index.css'
import store from './store'
import reportWebVitals from './reportWebVitals'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

ReactDOM.render(
    <MetronicLayoutProvider>
        <MetronicSubheaderProvider>
            <MetronicSplashScreenProvider>
                <Suspense fallback={<LayoutSplashScreen />}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Provider store={store}>
                            <Router>
                                <LayoutProvider>
                                    <Routes />
                                </LayoutProvider>
                            </Router>
                        </Provider>
                    </LocalizationProvider>
                </Suspense>
            </MetronicSplashScreenProvider>
        </MetronicSubheaderProvider>
    </MetronicLayoutProvider>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()