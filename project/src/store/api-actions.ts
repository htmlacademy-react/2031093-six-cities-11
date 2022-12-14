import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import * as Action from './action';
import { AppDispatch, State } from '../types/state.js';
import { Offer, Comment, FormPostData, FavoritePostData } from '../types/types';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute } from '../utils/constants';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuthAction',
  async (_arg, {extra: api}) => {
    const {data: user} = await api.get<UserData>(APIRoute.Login);
    return user;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/loginAction',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: user} = await api.post<UserData>(APIRoute.Login, {email, password});
    const {token} = user;
    saveToken(token);
    dispatch(Action.redirectToRoute(AppRoute.Main));
    return user;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logoutAction',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffersAction',
  async (_arg, {extra: api}) => {
    const {data: offers} = await api.get<Offer[]>(APIRoute.Offers);
    return offers;
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<Offer[], number, {
  offerID: number;
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffersAction',
  async (offerId, {extra: api}) => {
    const {data: offers} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return offers;
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteOffersAction',
  async (_arg, {extra: api}) => {
    const {data: offers} = await api.get<Offer[]>(APIRoute.Favorite);
    return offers;
  },
);

export const fetchOfferAction = createAsyncThunk<Offer, number, {
  offerID: number;
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferAction',
  async (offerID, {extra: api}) => {
    const {data: offer} = await api.get<Offer>(`${APIRoute.Offers}/${offerID}`);
    return offer;
  },
);

export const fetchCommentsAction = createAsyncThunk<Comment[], number, {
  offerID: number;
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCommentsAction',
  async (offerID, {extra: api}) => {
    const {data: comments} = await api.get<Comment[]>(`${APIRoute.Comments}/${offerID}`);
    return comments;
  },
);

export const postNewOfferComment = createAsyncThunk<Comment[], FormPostData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postNewOfferComment',
  async ({offerId, formData}, {dispatch, extra: api}) => {
    const {data: comments} = await api.post<Comment[]>(`${APIRoute.Comments}/${offerId}`, formData);
    return comments;
  },
);

export const postFavoriteStatus = createAsyncThunk<Offer, FavoritePostData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postFavoriteStatus',
  async ({offerId, status}, {dispatch, extra: api}) => {
    const {data: offer} = await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${status}`, null);

    return offer;
  },
);
