import { MouseEvent } from 'react';

import { Offer } from '../../types/types';
import OfferCard from '../../components/offer-card/offer-card';

type OffersListProps = {
  offers: Offer[];
  parent: string;
  onListItemHover: (listItemName: string) => void;
}

function OffersList({ offers, parent, onListItemHover }: OffersListProps): JSX.Element {
  const handleListItemHover = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();

    const cardTitleElement: HTMLLIElement | null = event.currentTarget.querySelector('.place-card__name a');
    if (cardTitleElement) {
      onListItemHover(cardTitleElement.innerText);
    }
  };

  return (
    <>
      {Object.values(offers).map((offer: Offer) => (
        <OfferCard
          offer={offer}
          parent={parent}
          onMouseEnter={handleListItemHover}
          key={`${parent}-${offer.id}`}
        />
      ))}
    </>
  );
}

export default OffersList;
