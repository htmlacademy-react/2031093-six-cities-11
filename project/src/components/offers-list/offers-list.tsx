import { MouseEvent } from 'react';

import { Offer } from '../../types/types';
import OfferCard from '../../components/offer-card/offer-card';

type OffersListProps = {
  offers: Offer[];
  parent: string;
  setHoveredOffer: (offer: Offer | undefined) => void;
  onOfferCardClick: (offerId: number, offers: Offer[]) => void;
}

function OffersList({ offers, parent, setHoveredOffer, onOfferCardClick }: OffersListProps): JSX.Element {
  const handleOfferCardHover = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    const cardElement: HTMLLIElement | null = evt.currentTarget;
    if (cardElement && cardElement.dataset.id) {
      setHoveredOffer(offers.find((offer) => offer.id.toString() === cardElement.dataset.id));
    }
  };

  const handleOfferCardClick = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    const cardElement: HTMLLIElement | null = evt.currentTarget;
    if (cardElement && cardElement.dataset.id) {
      onOfferCardClick(+cardElement.dataset.id, offers);
    }
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
