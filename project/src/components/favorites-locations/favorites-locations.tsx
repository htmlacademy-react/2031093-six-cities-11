import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/index';
import { getFavoriteOffers } from '../../store/data-process/selectors';
import { Offer } from '../../types/types';
import FavoritesCard from '../../components/favorites-card/favorites-card';

type FavoritesLocationsProps = {
  city: string;
  onFavoritesButtonClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}

function FavoritesLocations({ city, onFavoritesButtonClick }: FavoritesLocationsProps): JSX.Element {
  const favoriteOffers = Object.values(useAppSelector(getFavoriteOffers))
    .filter((offer) => offer.isFavorite)
    .map((offer: Offer) => (
      <FavoritesCard
        offer={offer}
        onFavoritesButtonClick={onFavoritesButtonClick}
        key={`favorite-offer-${offer.id}`}
      />));

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
        {favoriteOffers}
      </div>
    </li>
  );
}

export default FavoritesLocations;
