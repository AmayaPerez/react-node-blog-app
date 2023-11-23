import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthContextProvider from './Context/AuthContext'

import axios from 'axios';

axios.defaults.baseURL = 'https://react-node-blog-app.vercel.app';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; 
 
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
       <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
