type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type City = {
    location: Location;
    name: string;
  }

export type Host = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: Host;
  id: string;//TODO type number after test
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

export type CityOffers = {
  city: string;
  offers: Offer[];
}
