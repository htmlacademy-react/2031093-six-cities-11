import { MouseEvent } from 'react';
import { Offer } from '../../types/types';
import OfferCard from '../../components/offer-card/offer-card';

type OffersListProps = {
  offers: Offer[];
  onListItemHover: (listItemName: string) => void;
  parent: string;
}

function OffersList({ offers, onListItemHover, parent }: OffersListProps): JSX.Element {
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
          onMouseEnter={handleListItemHover}
          parent={parent}
          key={`${parent}-${offer.id}`}
        />
      ))}
    </>
  );
}

export default OffersList;
