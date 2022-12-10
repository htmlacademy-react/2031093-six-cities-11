import { Offer } from '../types/types';

export const OFFERS_QUANTITY = 4;
export const TIMEOUT_SHOW_ERROR = 2000;
export const URL_MARKER_DEFAULT = './img/pin.svg';
export const URL_MARKER_CURRENT = './img/pin-active.svg';


export const INITIAL_OFFER: Offer | undefined = undefined;
export const INITIAL_CITY = 'Paris';
export const CITIES: string[] = [
  INITIAL_CITY,
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum Rating {
  ZeroStar = 0,
  OneStar = 1,
  TwoStar = 2,
  ThreeStar = 3,
  FourStar = 4,
  FiveStar = 5,
}

export enum APIRoute {
  GetOffers = '/hotels',
  GetOffer = '/hotels/{hotelId}',//TODO
  GetNearbyOffers = '/hotels/{hotelId}/nearby',//TODO
  GetFavoriteList = '/favorite',//TODO
  PostFavoriteSrarus = '/favorite/{hotelId}/{status}',//TODO
  GetOfferComments = '/comments/{hotelId}',//TODO
  PostNewOfferComment = '/comments/{hotelId}',//TODO
  Login = '/login',
  Logout = '/logout',
}

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ApartmentType {
  Apartment = 'apartment',
  Room = 'room',
  House = 'house',
  Hotel = 'hotel',
}

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}
export const DEFAULT_SORT_TYPE = SortType.Popular;
