import { createAction } from '@reduxjs/toolkit';

import { Offer, Comment, FormData } from '../types/types';
import { UserData } from '../types/user-data';
import { SortType } from '../utils/constants';
import { AppRoute, AuthorizationStatus } from '../utils/constants';

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setUser = createAction<UserData>('user/setUser');

export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const loadNearbyOffers = createAction<Offer[]>('data/loadNearbyOffers');
export const loadFavoriteOffers = createAction<Offer[]>('data/loadFavoriteOffers');
export const loadOffer = createAction<Offer | undefined>('data/loadOffer');
export const loadComments = createAction<Comment[]>('data/loadComments');
export const postNewOfferComment = createAction<FormData>('data/postNewOfferComment');
export const postFavoriteStatus = createAction<Offer>('data/postFavoriteStatus');

export const changeOffersDataLoadingStatus = createAction<boolean>('offers/changeOffersDataLoadingStatus');
export const changeCity = createAction<string>('offers/changeCity');
export const changeSortType = createAction<SortType>('offers/changeSortType');
export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');
