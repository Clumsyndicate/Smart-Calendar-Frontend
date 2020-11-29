import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux'
import App from './App';
import store from  './store';
import decoder from 'jwt-decode'
import {syncInfoAct} from './mypages/login/store/creator'
const token =localStorage.getItem('storeTOKEN')

if(token)
{
    store.dispatch(syncInfoAct(decoder(token)));
}

ReactDOM.render(
<Provider store = {store}>
    <App/>
</Provider>, 
document.querySelector('#root'))