import { Offer } from '../types/types';
import { UserData } from '../types/user-data';

export const OFFERS_QUANTITY = 4;
export const REQUEST_TIMEOUT = 5000;

export const BACKEND_URL = 'https://11.react.pages.academy/six-cities';
export const URL_MARKER_DEFAULT = './img/pin.svg';
export const URL_MARKER_CURRENT = './img/pin-active.svg';

export const FAVORITE_BUTTON_ACTIVE_CLASS = 'place-card__bookmark-button--active';
export const ROOM_FAVORITE_BUTTON_ACTIVE_CLASS = 'property__bookmark-button--active';

export const NEW_REVIEW_POST_ERROR = 'An error occured during your review posting.';
export const NOT_VALID_PASSWORD_ERROR = 'The password must contain at least one latin character and one number.';

export const PASSWORD_REGEX = /([a-zA-Z_]{1}[0-9]{1}|[0-9]{1}[a-zA-Z_]{1})[a-zA-Z0-9_]*/;

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
  avatarUrl: '',
  isPro: false,
  name: '',
  email: 'eee',
  token: '',
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

export enum ReviewPostStatus {
  Unknown = 'UNKNOWN',
  Pending = 'PENDING',
  Fulfilled = 'FULFILLED',
  Rejected = 'REJECTED',
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

export enum NameSpace {
  User = 'USER',
  Data = 'DATA',
  App = 'APP',
}
