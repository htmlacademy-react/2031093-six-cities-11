import { createSlice } from '@reduxjs/toolkit';

import * as Action from '../api-actions';
import { NameSpace, ReviewPostStatus, INITIAL_OFFER } from '../../utils/constants';
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
  isNewCommentDataPosting: false,
  reviewPostStatus: ReviewPostStatus.Unknown,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    resetIsNewCommentDataPosting: (state) => {
      state.isNewCommentDataPosting = false;
      state.reviewPostStatus = ReviewPostStatus.Unknown;
    },
  },
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
        state.isNewCommentDataPosting = true;
        state.reviewPostStatus = ReviewPostStatus.Pending;
      })
      .addCase(Action.postNewOfferComment.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.reviewPostStatus = ReviewPostStatus.Fulfilled;
      })
      .addCase(Action.postNewOfferComment.rejected, (state) => {
        state.reviewPostStatus = ReviewPostStatus.Rejected;
      })
      .addCase(Action.postFavoriteStatus.pending, (state) => {
        state.isOneOfferDataLoading = true;
      })
      .addCase(Action.postFavoriteStatus.fulfilled, (state, action) => {
        if (action.payload) {
          state.offer = action.payload;
        }
        state.isOneOfferDataLoading = false;
      })
      .addCase(Action.postFavoriteStatus.rejected, (state) => {
        state.isOneOfferDataLoading = false;
      });
  }
});
