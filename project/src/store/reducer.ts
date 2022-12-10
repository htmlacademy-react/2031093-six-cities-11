import { createReducer } from '@reduxjs/toolkit';

import * as Type from '../types/types';
import * as UserAction from './action';
import * as Const from '../utils/constants';

type InitalState = {
  offers: Type.Offer[];
  city: string;
  sortType: Const.SortType;
  offer: Type.Offer | undefined;
  formData: Type.FormData;
  authorizationStatus: Const.AuthorizationStatus;
}

const formData: Type.FormData = {
  rating: Const.Rating.ZeroStar,
  text: '',
};
const initialState: InitalState = {
  offers: [],
  city: Const.INITIAL_CITY,
  sortType: Const.DEFAULT_SORT_TYPE,
  offer: Const.INITIAL_OFFER,
  formData,
  authorizationStatus: Const.AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(UserAction.loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(UserAction.changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(UserAction.changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(UserAction.changeOffer, (state, action) => {
      if (action.payload) {
        state.offer = action.payload;
      }
    })
    .addCase(UserAction.changeFormData, (state, action) => {
      state.formData = action.payload;
    })
    .addCase(UserAction.requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
