import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { Offer } from '../../types/types';
import { AppRoute } from '../../utils/constants';

type OfferCardProps = {
  offer: Offer;
  parent: string;
  onMouseEnter?: (event: MouseEvent<HTMLLIElement>) => void;
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;
}

function OfferCard({ offer, parent, onMouseEnter, onClick }: OfferCardProps): JSX.Element {
  const style = {
    width: `${offer.rating * 20}%`,
  };
  const className = `place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active ' : ''}button`;
  const images = offer.images as string[];
  const photo = (images.length > 0) ? images[0] : '';
  const route = AppRoute.Room.slice(0, AppRoute.Room.indexOf(':'));
  const link = `${route}${offer.id}`;

  const handleMouseEnter = (evt: MouseEvent<HTMLLIElement>) => {
    if (onMouseEnter) {
      onMouseEnter(evt);
    }
  };

  const handleClick = (evt: MouseEvent<HTMLLIElement>) => {
    if (onClick) {
      onClick(evt);
    }
  };

  return (
    <article data-id={offer.id}
      className={`${parent}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {offer.isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> :
        ''}
      <div className={`${parent}__image-wrapper place-card__image-wrapper`}>
        <Link to={link}>
          <img className="place-card__image" src={photo} width="260" height="200" alt="Place"></img>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={className} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={style}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={link}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
