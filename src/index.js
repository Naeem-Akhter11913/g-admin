import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'core-js';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from "redux-persist/integration/react";

import App from './App';
import store ,{persistor} from './store/store';
import { AuthProvider } from './hook/AuthContext';
import 'sweetalert2/src/sweetalert2.scss';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <ToastContainer />
        </AuthProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
