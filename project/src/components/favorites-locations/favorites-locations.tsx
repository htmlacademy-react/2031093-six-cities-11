import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { Offer } from '../../types/types';
import FavoritesCard from '../../components/favorites-card/favorites-card';

type FavoritesLocationsProps = {
  offers: Offer[];
  city: string;
  onOfferCardClick: (offerId: number, offers: Offer[]) => void;
}

function FavoritesLocations({ offers, city, onOfferCardClick }: FavoritesLocationsProps): JSX.Element {
  const handleOfferCardClick = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();

    const cardElement: HTMLLIElement | null = event.currentTarget;
    if (cardElement && cardElement.dataset.id) {
      onOfferCardClick(+cardElement.dataset.id, offers);
    }
  };

  const favoriteOffers = Object.values(offers)
    .filter((offer) => offer.isFavorite)
    .map((offer: Offer) => (
      <FavoritesCard
        offer={offer}
        onClick={handleOfferCardClick}
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
