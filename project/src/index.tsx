import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { MainPageProps } from './utils/props';
import * as Const from './utils/constants';

const props: MainPageProps = {
  isPremium: true,
  rating: Const.Rating.FourStar,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App {...props} />
  </React.StrictMode>,
);
