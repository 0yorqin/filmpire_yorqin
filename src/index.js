import React from 'react';
import App from './components/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import './index.css';
import ToggleColorModeProvider from './utils/ToggleColorMode';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorModeProvider>
  </Provider>
);
