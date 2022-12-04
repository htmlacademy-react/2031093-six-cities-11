import * as Const from '../utils/constants';
import { Offer, CityOffers } from '../utils/props';
import { nanoid } from 'nanoid';

const apartmentTypes: string[] = [
  Const.ApartmentType.Apartment,
  Const.ApartmentType.Hotel,
  Const.ApartmentType.House,
  Const.ApartmentType.Room,
];
const apartmentRatings: number[] = [
  Const.Rating.ThreeStar,
  Const.Rating.FiveStar,
  Const.Rating.OneStar,
  Const.Rating.FourStar,
];
const getRating = (i: number): number => apartmentRatings[i];
const getApartmentType = (i: number): string => apartmentTypes[i];

const offers: Offer[] = [];
for (let i = 0; i < Const.offersQuantity; i++) {
  offers.push({
    id: nanoid(),
    bedrooms: i,
    city: {
      location: {
        latitude: 32.32,
        longitude: 33.33,
        zoom: 1,
      },
      name: '',
    },
    description: 'description',
    goods: [
      'Wi-Fi',
      'Kitchen',
      'Fridge',
      'Washing machine',
      'Dishwasher',
    ],
    host: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 0,
      isPro: !!(i % 2),
      name: 'Max',
    },
    images: [
      `img/apartment-0${(i % 3) + 1}.jpg`,
      `img/apartment-0${(i % 3) + 1}.jpg`,
      `img/apartment-0${(i % 3) + 1}.jpg`,
    ],
    isFavorite: !!(i % 2),
    isPremium: (i === 1),
    location: {
      latitude: 32.32,
      longitude: 33.33,
      zoom: 1,
    },
    maxAdults: i,
    previewImage: `img/apartment-0${(i % 3) + 1}.jpg`,
    price: 100 + 10 * i,
    rating: getRating(i),
    title: `Nice ${getApartmentType(i)} ${i}`,
    type: `${getApartmentType(i).slice(0, 1).toUpperCase()}${getApartmentType(i).slice(1)}`,
  });
}

const citiesOffers: CityOffers[] = [];
for (let i = 0; i < Const.cities.length; i++) {
  citiesOffers.push({
    city: Const.cities[i],
    offers,
  });
}

export { offers, citiesOffers };
