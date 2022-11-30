import * as Const from '../utils/constants';
import { Offer, CityOffers } from '../utils/props';

const getRating = (): string => Const.Rating.FourStar;

const offers: Offer[] = [];
for (let i = 0; i < Const.offersQuantity; i++) {
  offers.push({
    isFavorite: true,
    isPremium: true,
    picture: 'img/apartment-01.jpg',
    price: 100,
    rating: getRating(),
    title: 'Nice apartment',
    type: 'Apartment',
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
