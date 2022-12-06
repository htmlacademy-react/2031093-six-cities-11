import { Link } from 'react-router-dom';
import { Offer } from '../../types/types';
import FavoritesCard from '../../components/favorites-card/favorites-card';

type FavoritesLocationsProps = {
  offers: Offer[];
  city: string;
}

function FavoritesLocations({ offers, city }: FavoritesLocationsProps): JSX.Element {
  const favoriteOffers = Object.values(offers)
    .filter((offer) => offer.isFavorite)
    .map((offer: Offer) => <FavoritesCard offer={offer} key={offer.id} />);

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
