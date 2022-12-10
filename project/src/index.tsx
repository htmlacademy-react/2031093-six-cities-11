import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import { checkAuthAction } from './store/api-actions';
import { store } from '../src/store/index';
import { comments } from './mock/comments';//TODO remove this mock

store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <ErrorMessage />
      <App comments={comments} />
    </Provider>
  </React.StrictMode>,
);
