import { createAction } from '@reduxjs/toolkit';

import { Offer, FormData } from '../types/types';
import { SortType } from '../utils/constants';
import { AuthorizationStatus } from '../utils/constants';

export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const changeCity = createAction<string>('offers/changeCity');
export const changeSortType = createAction<SortType>('offers/changeSortType');
export const changeOffer = createAction<Offer | undefined>('offers/changeOffer');
export const changeFormData = createAction<FormData>('offers/changeFormData');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
