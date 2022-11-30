import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers, citiesOffers } from './test-data/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App offers={offers} citiesOffers={citiesOffers} />
  </React.StrictMode>,
);
