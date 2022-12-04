export type Owner = {
  name: string;
  avatar: string;
  isPro: boolean;
}

export type Offer = {
  id: string;
  isPremium: boolean;
  price: number;
  title: string;
  type: string;
  isFavorite: boolean;
  rating: string;
  photos: string[];
  description: string;
  bedrooms: number;
  guests: number;
  owner: Owner;
  equipments: string[];
}

export type CityOffers = {
  city: string;
  offers: Offer[];
}

export type LocationsListItemProps = {
  city: string;
  isActive?: boolean;
}
