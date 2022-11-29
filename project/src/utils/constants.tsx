export const offersQuantity = 5;

export enum Rating {
  OneStar = '20%',
  TwoStar = '40%',
  ThreeStar = '60%',
  FourStar = '80%',
  FiveStar = '100%'
}

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites', //TODO Private
  Room = '/offer', //TODO '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
