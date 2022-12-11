import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import * as Action from './action';
import { AppDispatch, State } from '../types/state.js';
import { Offer, Comment } from '../types/types';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, AppRoute, INITIAL_USER } from '../utils/constants';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuthAction',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: user} = await api.get<UserData>(APIRoute.Login);
      dispatch(Action.requireAuthorization(AuthorizationStatus.Auth));
      dispatch(Action.setUser(user));
    } catch {
      dispatch(Action.requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(Action.setUser(INITIAL_USER));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/loginAction',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: user} = await api.post<UserData>(APIRoute.Login, {email, password});
    const {token} = user;
    saveToken(token);
    dispatch(Action.requireAuthorization(AuthorizationStatus.Auth));
    dispatch(Action.setUser(user));
    dispatch(Action.redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logoutAction',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(Action.requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(Action.setUser(INITIAL_USER));
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffersAction',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(Action.changeOffersDataLoadingStatus(true));
    dispatch(Action.loadOffers(data));
    dispatch(Action.changeOffersDataLoadingStatus(false));
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, number, {
  offerID: number;
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffersAction',
  async (offerID, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerID}/nearby`);
    dispatch(Action.changeOffersDataLoadingStatus(true));
    dispatch(Action.loadNearbyOffers(data));
    dispatch(Action.changeOffersDataLoadingStatus(false));
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteOffersAction',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorite);
    dispatch(Action.changeOffersDataLoadingStatus(true));
    dispatch(Action.loadFavoriteOffers(data));
    dispatch(Action.changeOffersDataLoadingStatus(false));
  },
);

export const fetchOfferAction = createAsyncThunk<void, number, {
  offerID: number;
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferAction',
  async (offerID, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${offerID}`);
    dispatch(Action.changeOffersDataLoadingStatus(true));
    dispatch(Action.loadOffer(data));
    dispatch(Action.changeOffersDataLoadingStatus(false));
  },
);

export const fetchCommentsAction = createAsyncThunk<void, number, {
  offerID: number;
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCommentsAction',
  async (offerID, {dispatch, extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${offerID}`);
    dispatch(Action.changeOffersDataLoadingStatus(true));
    dispatch(Action.loadComments(data));
    dispatch(Action.changeOffersDataLoadingStatus(false));
  },
);
