import { createReducer } from '@reduxjs/toolkit';

import { UserData } from '../types/user-data';
import * as Type from '../types/types';
import * as Action from './action';
import * as Const from '../utils/constants';

type InitalState = {
  offers: Type.Offer[];
  city: string;
  sortType: Const.SortType;
  offer: Type.Offer | undefined;
  formData: Type.FormData;
  authorizationStatus: Const.AuthorizationStatus;
  isOffersDataLoading: boolean;
  user: UserData;
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
  isOffersDataLoading: false,
  user: Const.INITIAL_USER,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Action.loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(Action.changeOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(Action.requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(Action.setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(Action.changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(Action.changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(Action.changeOffer, (state, action) => {
      if (action.payload) {
        state.offer = action.payload;
      }
    })
    .addCase(Action.changeFormData, (state, action) => {
      state.formData = action.payload;
    });
});

export {reducer};
