import { MouseEvent } from 'react';
import { Offer } from '../../types/types';
import OfferCard from '../../components/offer-card/offer-card';

type OffersListProps = {
  offers: Offer[];
  onListItemHover: (listItemName: string) => void;
}

function OffersList({ offers, onListItemHover }: OffersListProps): JSX.Element {
  const handleListItemHover = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();

    const cardTitleElement: HTMLLIElement | null = event.currentTarget.querySelector('.place-card__name a');
    if (cardTitleElement) {
      onListItemHover(cardTitleElement.innerText);
    }
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {Object.values(offers).map((offer: Offer) => <OfferCard offer={offer} onMouseEnter={handleListItemHover} key={offer.id} />)}
    </div>
  );
}

export default OffersList;
