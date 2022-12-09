import { MouseEvent } from 'react';

import { Offer } from '../../types/types';
import OfferCard from '../../components/offer-card/offer-card';

type OffersListProps = {
  offers: Offer[];
  parent: string;
  onOfferCardHover: (offerId: string) => void;
  onOfferCardClick: (offerId: string) => void;
}

function OffersList({ offers, parent, onOfferCardHover, onOfferCardClick }: OffersListProps): JSX.Element {
  const handleOfferCardMouseEvent = (evt: MouseEvent<HTMLLIElement>, callback: (offerId: string) => void) => {
    evt.preventDefault();
    const cardElement: HTMLLIElement | null = evt.currentTarget;
    if (cardElement && cardElement.dataset.id) {
      callback(cardElement.dataset.id);
    }
  };

  const handleOfferCardHover = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    handleOfferCardMouseEvent(evt, onOfferCardHover);
  };

  const handleOfferCardClick = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    handleOfferCardMouseEvent(evt, onOfferCardClick);
  };

  return (
    <>
      {Object.values(offers).map((offer: Offer) => (
        <OfferCard
          offer={offer}
          parent={parent}
          onMouseEnter={handleOfferCardHover}
          onClick={handleOfferCardClick}
          key={`${parent}-${offer.id}`}
        />
      ))}
    </>
  );
}

export default OffersList;
