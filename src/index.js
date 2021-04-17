import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import combineReducers from './redux/admin/index';
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import './index.css';




const store = createStore(combineReducers, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
