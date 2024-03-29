import * as React from 'react';
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.scss';
import { App } from './App';
import { store } from './store/store';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root') as HTMLElement;
if(!rootElement) throw new Error('Failed to find root element');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
