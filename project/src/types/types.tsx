import { Rating } from '../utils/constants';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
    location: Location;
    name: string;
  }

export type Host = {
  id: number;
  avatarUrl: string;
  isPro: boolean;
  name: string;
}

export type Offer = {
  id: number;
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: Host;
  images: string[] | [string];
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}

export type Comment = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: {
    id: number;
    avatarUrl: string;
    isPro: boolean;
    name: string;
  };
}

export type FormData = {
  rating: Rating;
  text: string;
}
