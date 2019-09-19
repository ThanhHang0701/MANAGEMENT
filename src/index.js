import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import counterApp from '../src/reducer/index'
const store = createStore(
    counterApp 
);
ReactDOM.render( 
    <Provider store = {store}>
      <App />
  </Provider>, document.getElementById('root'));
serviceWorker.unregister();