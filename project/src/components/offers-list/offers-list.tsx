import { MouseEvent } from 'react';

import { Offer } from '../../types/types';
import OfferCard from '../../components/offer-card/offer-card';

type OffersListProps = {
  offers: Offer[];
  parent: string;
  setHoveredOffer: (offer: Offer | undefined) => void;
}

function OffersList({ offers, parent, setHoveredOffer }: OffersListProps): JSX.Element {
  const handleOfferCardHover = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    const cardElement: HTMLLIElement | null = evt.currentTarget;
    if (cardElement && cardElement.dataset.id) {

      setHoveredOffer(offers.find((offer) => offer.id.toString() === cardElement.dataset.id));
    }
  };

  return (
    <>
      {Object.values(offers).map((offer: Offer) => (
        <OfferCard
          offer={offer}
          parent={parent}
          onMouseEnter={handleOfferCardHover}
          key={`${parent}-${offer.id}`}
        />
      ))}
    </>
  );
}

export default OffersList;
