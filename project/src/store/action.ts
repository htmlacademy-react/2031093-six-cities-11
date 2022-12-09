import { createAction } from '@reduxjs/toolkit';

import { Offer, FormData } from '../types/types';
import { SortType } from '../utils/constants';

export const storeOffers = createAction<Offer[]>('offers/storeOffers');
export const changeCity = createAction<string>('offers/changeCity');
export const changeSortType = createAction<SortType>('offers/changeSortType');
export const changeOffer = createAction<Offer | undefined>('offers/changeOffer');
export const changeFormData = createAction<FormData>('offers/changeFormData');
