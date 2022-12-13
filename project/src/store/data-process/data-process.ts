import { createSlice } from '@reduxjs/toolkit';

import * as Action from '../api-actions';
import { NameSpace, INITIAL_OFFER } from '../../utils/constants';
import { DataProcess } from '../../types/state';

const initialState: DataProcess = {
  offers: [],
  nearbyOffers: [],
  favoriteOffers: [],
  offer: INITIAL_OFFER,
  comments: [],
  isOffersDataLoading: false,
  isOneOfferDataLoading: false,
  isCommentsDataLoading: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(Action.fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(Action.fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(Action.fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(Action.fetchNearbyOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(Action.fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(Action.fetchNearbyOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(Action.fetchFavoriteOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(Action.fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(Action.fetchFavoriteOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(Action.fetchOfferAction.pending, (state) => {
        state.isOneOfferDataLoading = true;
      })
      .addCase(Action.fetchOfferAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.offer = action.payload;
          Action.fetchNearbyOffersAction(state.offer.id);
        }
        state.isOneOfferDataLoading = false;
      })
      .addCase(Action.fetchOfferAction.rejected, (state) => {
        state.isOneOfferDataLoading = false;
      })
      .addCase(Action.fetchCommentsAction.pending, (state) => {
        state.isCommentsDataLoading = true;
      })
      .addCase(Action.fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsDataLoading = false;
      })
      .addCase(Action.fetchCommentsAction.rejected, (state) => {
        state.isCommentsDataLoading = false;
      })
      .addCase(Action.postNewOfferComment.pending, (state) => {
        state.isCommentsDataLoading = true;
      })
      .addCase(Action.postNewOfferComment.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsDataLoading = false;
      })
      .addCase(Action.postNewOfferComment.rejected, (state) => {
        state.isCommentsDataLoading = false;
      })
      .addCase(Action.postFavoriteStatus.pending, (state) => {
        state.isOneOfferDataLoading = true;
      })
      .addCase(Action.postFavoriteStatus.fulfilled, (state, action) => {
        if (action.payload) {
          state.offer = action.payload;
          Action.fetchOffersAction();
          Action.fetchFavoriteOffersAction();
        }
        state.isOneOfferDataLoading = false;
      })
      .addCase(Action.postFavoriteStatus.rejected, (state) => {
        state.isOneOfferDataLoading = false;
      });
  }
});
