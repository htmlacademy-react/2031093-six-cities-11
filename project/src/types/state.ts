import { store } from '../store/index';
import { AuthorizationStatus, ReviewPostStatus, SortType } from '../utils/constants';
import { UserData } from '../types/user-data';
import { Offer, Comment } from '../types/types';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData;
};

export type DataProcess = {
  offers: Offer[];
  nearbyOffers: Offer[];
  favoriteOffers: Offer[];
  offer: Offer | undefined;
  comments: Comment[];
  isOffersDataLoading: boolean;
  isOneOfferDataLoading: boolean;
  isCommentsDataLoading: boolean;
  isNewCommentDataPosting: boolean;
  reviewPostStatus: ReviewPostStatus;
};

export type AppProcess = {
  city: string;
  sortType: SortType;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
