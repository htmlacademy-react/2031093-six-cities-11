import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/types';

export const changeCity = createAction<string>('offers/changeCity');
export const getAllOffers = createAction<Offer[]>('offers/getAllOffers');
