import { Link } from 'react-router-dom';
import { CityOffers, Offer } from '../../utils/props';
import FavoritesCard from '../../components/favorites-card/favorites-card';

function FavoritesLocations(cityOffers: CityOffers): JSX.Element {
  const city: string = cityOffers.city;
  const favoriteOffers = Object.values(cityOffers.offers)
    .filter((offer) => offer.isFavorite)
    .map((offer: Offer) => FavoritesCard({offer}));

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to="#">
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {/* Place for favorites cards */}
        {favoriteOffers}
      </div>
    </li>
  );
}

export default FavoritesLocations;
