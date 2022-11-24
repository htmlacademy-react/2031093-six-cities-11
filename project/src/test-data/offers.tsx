import * as Const from '../utils/constants';
import { Offer } from '../utils/props';

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

export default offers;
