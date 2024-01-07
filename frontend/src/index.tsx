import React from 'react';
import ReactDOM from 'react-dom/client';
import { persistor, store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </PersistGate>
    </Provider>
);
