import { createAction } from '@reduxjs/toolkit';
import { Offer, FormData } from '../types/types';

export const changeCity = createAction<string>('offers/changeCity');
export const getCityOffers = createAction<Offer[]>('offers/getCityOffers');
export const changeOffer = createAction<Offer | undefined>('offers/changeOffer');
export const changeFormData = createAction<FormData>('offers/changeFormData');
