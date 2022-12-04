import * as Const from '../utils/constants';
import { Offer, CityOffers } from '../utils/props';
import { nanoid } from 'nanoid';

const apartmentTypes: string[] = [
  Const.ApartmentType.Apartment,
  Const.ApartmentType.Hotel,
  Const.ApartmentType.House,
  Const.ApartmentType.Room,
];
const apartmentRatings: string[] = [
  Const.Rating.ThreeStar,
  Const.Rating.FiveStar,
  Const.Rating.OneStar,
  Const.Rating.FourStar,
];
const getRating = (i: number): string => apartmentRatings[i];
const getApartmentType = (i: number): string => apartmentTypes[i];

const offers: Offer[] = [];
for (let i = 0; i < Const.offersQuantity; i++) {
  offers.push({
    id: nanoid(),
    isPremium: (i === 1),
    price: 100 + 10 * i,
    title: `Nice ${getApartmentType(i)} ${i}`,
    type: `${getApartmentType(i).slice(0, 1).toUpperCase()}${getApartmentType(i).slice(1)}`,
    isFavorite: !!(i % 2),
    rating: getRating(i),
    photos: [
      `img/apartment-0${(i % 3) + 1}.jpg`,
      `img/apartment-0${(i % 3) + 1}.jpg`,
      `img/apartment-0${(i % 3) + 1}.jpg`,
    ],
    description: 'description',
    bedrooms: i,
    guests: i,
    owner: {
      name: 'Max',
      avatar: 'img/avatar-max.jpg',
      isPro: !!(i % 2)
    },
    equipments: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Fridge',
      'Washing machine',
      'Dishwasher'
    ],
  });
}

const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
const citiesOffers: CityOffers[] = [];
for (let i = 0; i < cities.length; i++) {
  citiesOffers.push({
    city: cities[i],
    offers,
  });
}

export { offers, citiesOffers };
