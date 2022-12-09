import { createReducer } from '@reduxjs/toolkit';

import { offers } from '../mock/offers';
import { FormData } from '../types/types';
import * as UserAction from './action';
import * as Const from '../utils/constants';

const formData: FormData = {
  rating: Const.Rating.ZeroStar,
  text: '',
};
const initialState = {
  city: Const.INITIAL_CITY,
  offers,
  offer: Const.INITIAL_OFFER,
  formData,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(UserAction.changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(UserAction.getCityOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(UserAction.changeOffer, (state, action) => {
      if (action.payload) {
        state.offer = action.payload;
      }
    })
    .addCase(UserAction.changeFormData, (state, action) => {
      state.formData = action.payload;
    });
});

export {reducer};
