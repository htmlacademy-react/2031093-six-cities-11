import { NameSpace, ReviewPostStatus } from '../../utils/constants';
import { State } from '../../types/state';
import { Offer, Comment } from '../../types/types';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.Data].nearbyOffers;
export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Data].favoriteOffers;
export const getOffer = (state: State): Offer | undefined => state[NameSpace.Data].offer;
export const getComments = (state: State): Comment[] => state[NameSpace.Data].comments;
export const getIsOffersDataLoading = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getIsOneOfferDataLoading = (state: State): boolean => state[NameSpace.Data].isOneOfferDataLoading;
export const getIsCommentsDataLoading = (state: State): boolean => state[NameSpace.Data].isCommentsDataLoading;
export const getIsNewCommentDataPosting = (state: State): boolean => state[NameSpace.Data].isNewCommentDataPosting;
export const getReviewPostStatus = (state: State): ReviewPostStatus => state[NameSpace.Data].reviewPostStatus;
