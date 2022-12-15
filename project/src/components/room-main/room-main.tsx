import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/index';
import { getAuthLoggedStatus } from '../../store/user-process/selectors';
import { getOffer, getNearbyOffers, getComments } from '../../store/data-process/selectors';
import { Offer, Comment } from '../../types/types';
import { AppRoute } from '../../utils/constants';
import GalaryCard from '../galary-card/galary-card';
import InsideItemCard from '../inside-item-card/inside-item-card';
import OffersList from '../offers-list/offers-list';
import ReviewList from '../review-list/review-list';
import ReviewForm from '../review-form/review-form';
import Map from '../map/map';

const MAP_HEIGHT = '579px';

type RoomMainProps = {
  setHoveredOffer: React.Dispatch<React.SetStateAction<Offer | undefined>>;
  onFavoritesButtonClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}

function RoomMain({ setHoveredOffer, onFavoritesButtonClick }: RoomMainProps): JSX.Element {
  const navigate = useNavigate();

  const isUserLogged = useAppSelector(getAuthLoggedStatus);
  const offer: Offer | undefined = useAppSelector(getOffer);
  const nearbyOffers: Offer[] = useAppSelector(getNearbyOffers);
  const comments: Comment[] = useAppSelector(getComments);

  const ratingStyle = {
    width: `${offer ? offer.rating * 20 : 0}%`,
  };
  const bookmarksClassName = `property__bookmark-button ${offer && offer.isFavorite ? 'property__bookmark-button--active ' : ''}button`;

  const handleFavoritesButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    if (!isUserLogged) {
      navigate(AppRoute.Login);
    }

    onFavoritesButtonClick(evt);
  };

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer && offer.images && offer.images.map((imagePath) => (
              <GalaryCard imagePath={imagePath} key={`${offer && offer.id}-${imagePath}`} />
            ))}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {offer && offer.isPremium ?
              <div className="property__mark">
                <span>Premium</span>
              </div> :
              ''}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offer && offer.title}
              </h1>
              <button data-id={offer?.id} className={bookmarksClassName} type="button"
                onClick={handleFavoritesButtonClick}
              >
                <svg className="place-card__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={ratingStyle}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{offer && offer.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {offer && offer.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offer && offer.bedrooms}
              </li>
              <li className="property__feature property__feature--adults">
                {offer && offer.maxAdults}
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{offer && offer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer && offer.goods.map((item) => <InsideItemCard item={item} key={`${offer.id}-${item.split(' ').join('-')}`} />)}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className={`property__avatar-wrapper${offer && offer.host.isPro ? ' property__avatar-wrapper--pro user__avatar-wrapper' : ''}`}>
                  <img className="property__avatar user__avatar" src={offer && offer.host.avatarUrl} width="74" height="74" alt="Host avatar"></img>
                </div>
                <span className="property__user-name">
                  {offer && offer.host.name}
                </span>
                <span className="property__user-status">
                  {offer && offer.host.isPro ? 'Pro' : ''}
                </span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  {offer && offer.description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot;
                <span className="reviews__amount">{comments.length}</span>
              </h2>
              <ReviewList comments={comments} />
              {isUserLogged
                ? <ReviewForm />
                : ''}
            </section>
          </div>
        </div>
        <section className="property__map map">
          {nearbyOffers && (nearbyOffers.length > 0) && offer && offer.city &&
            <Map
              city={offer.city}
              offers={[...nearbyOffers, offer]}
              selectedOffer={offer}
              height={MAP_HEIGHT}
            />}
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <OffersList
              offers={nearbyOffers}
              parent={'near-places'}
              setHoveredOffer={setHoveredOffer}
              onFavoritesButtonClick={onFavoritesButtonClick}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default RoomMain;
