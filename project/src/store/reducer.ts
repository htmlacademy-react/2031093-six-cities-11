import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mock/offers';
import * as Const from '../utils/constants';
import { changeCity, getAllOffers } from './action';

const initialState = {
  city: Const.INITIAL_CITY,
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
  .addCase(changeCity, (state, action) => {
    state.city = action.payload;
  })
  .addCase(getAllOffers, (state, action) => {
    state.offers = action.payload;
  });
});

export {reducer};
