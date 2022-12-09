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
  offers,
  city: Const.INITIAL_CITY,
  sortType: Const.DEFAULT_SORT_TYPE,
  // sortedOffers: offers,
  offer: Const.INITIAL_OFFER,
  formData,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(UserAction.storeOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(UserAction.changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(UserAction.changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    // .addCase(UserAction.storeSortedOffers, (state, action) => {
    //   state.sortedOffers = action.payload;
    // })
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
