import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './index.css';

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import contactApi from './service/apiService';

ReactDOM.render( <
    React.StrictMode >
    <
    ApiProvider api = { contactApi } >
    <
    Provider store = { store } >
    <
    PersistGate loading = { null }
    persistor = { persistor } >
    <
    App / >
    <
    /PersistGate> <
    /Provider> <
    /ApiProvider> <
    /React.StrictMode>,
    document.querySelector('#root')
);
