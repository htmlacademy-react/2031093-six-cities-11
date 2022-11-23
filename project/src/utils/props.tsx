export type Offer = {
  isFavorite: boolean;
  isPremium: boolean;
  picture: string;
  price: number;
  rating: string;
  title: string;
  type: string;
}

export type CityOffers = {
  city: string;
  offers: Offer[];
}
