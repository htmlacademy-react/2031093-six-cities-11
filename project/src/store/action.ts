import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../utils/constants';

export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');
