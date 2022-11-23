import FavoritesCard from '../../components/favorites-card/favorites-card';
import { CityOffers, Offer } from '../../utils/props';

function FavoritesLocations(cityOffers: CityOffers): JSX.Element {
  const city: string = cityOffers.city;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {/* Place for favorites cards */}
        {Object.values(cityOffers.offers).map((offer: Offer) => FavoritesCard(offer))}
      </div>
    </li>
  );
}

export default FavoritesLocations;
