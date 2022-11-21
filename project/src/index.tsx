import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import OfferCard from './components/offer-card/offer-card';
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
    <App>
      <OfferCard isPremium={props.isPremium} rating={props.rating} />
      <OfferCard isPremium={props.isPremium} rating={props.rating} />
    </App>
  </React.StrictMode>,
);
