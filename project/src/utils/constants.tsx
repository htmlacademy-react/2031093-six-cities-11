import { Offer } from '../types/types';
import { UserData } from '../types/user-data';

export const OFFERS_QUANTITY = 4;
export const REQUEST_TIMEOUT = 5000;
export const BACKEND_URL = 'https://11.react.pages.academy/six-cities';
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

export const INITIAL_USER: UserData = {
  id: -1,
  email: 'eee',
  token: '',
  avatarUrl: '',
};

export enum Rating {
  ZeroStar = 0,
  OneStar = 1,
  TwoStar = 2,
  ThreeStar = 3,
  FourStar = 4,
  FiveStar = 5,
}

export enum APIRoute {
  Login = '/login',
  Logout = '/logout',
  Offers = '/hotels',
  Favorite = '/favorite',
  Comments = '/comments',
  PostFavoriteStatus = '/favorite',//'/favorite/{hotelId}/{status}'
}

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFound = '/404',
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
