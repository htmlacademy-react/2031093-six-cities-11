import * as Const from '../utils/constants';
import { Offer } from '../types/types';
import { nanoid } from 'nanoid';

const coordinates = [
  [52.3909553943508, 4.85309666406198],
  [52.3609553943508, 4.85309666406198],
  [52.3909553943508, 4.929309666406198],
  [52.3809553943508, 4.939309666406198],
];
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
for (let i = 0; i < Const.OFFERS_QUANTITY; i++) {
  const coordinatesMinInd = Math.min(coordinates.length, Const.OFFERS_QUANTITY);
  offers.push({
    id: nanoid(),
    bedrooms: i,
    city: {
      location: {
        latitude: coordinates[i % coordinatesMinInd][0],
        longitude: coordinates[i % coordinatesMinInd][1],
        zoom: 1,
      },
      name: 'Amsterdam',
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
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
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 1,
    },
    maxAdults: i,
    previewImage: `img/apartment-0${(i % 3) + 1}.jpg`,
    price: 100 + 10 * i,
    rating: getRating(i),
    title: `Beautiful & luxurious ${getApartmentType(i)} at great location`,
    type: `${getApartmentType(i).slice(0, 1).toUpperCase()}${getApartmentType(i).slice(1)}`,
  });
}

export { offers };
