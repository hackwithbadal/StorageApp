import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import UserReducer from './redux/UserSlice';
import IsloginSlice from './redux/IsloginSlice';

export const store = configureStore({
  reducer: {
    userdata: UserReducer,
    islogin: IsloginSlice,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);