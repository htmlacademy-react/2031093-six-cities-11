import { createAction } from '@reduxjs/toolkit';

import { Offer, FormData } from '../types/types';
import { UserData } from '../types/user-data';
import { SortType } from '../utils/constants';
import { AppRoute, AuthorizationStatus } from '../utils/constants';

export const setError = createAction<string | null>('data/setError');
export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const changeOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setUser = createAction<UserData>('user/setUser');
export const changeCity = createAction<string>('offers/changeCity');
export const changeSortType = createAction<SortType>('offers/changeSortType');
export const changeOffer = createAction<Offer | undefined>('offers/changeOffer');
export const changeFormData = createAction<FormData>('offers/changeFormData');
export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');
