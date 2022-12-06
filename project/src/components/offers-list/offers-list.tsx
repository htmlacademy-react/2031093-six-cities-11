import { Offer } from '../../types/types';
import OfferCard from '../../components/offer-card/offer-card';

type OffersListProps = {
  offers: Offer[];
}

function OffersList({ offers }: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {Object.values(offers).map((offer: Offer) => <OfferCard offer={offer} key={offer.id}/>)}
    </div>
  );
}

export default OffersList;
