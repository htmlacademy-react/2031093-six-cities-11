import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { Offer } from '../../types/types';
import { AppRoute, AuthorizationStatus, FAVORITE_BUTTON_ACTIVE_CLASS } from '../../utils/constants';

type FavoriteOfferProps = {
  offer: Offer;
  onFavoritesButtonClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}

function FavoritesCard({ offer, onFavoritesButtonClick }: FavoriteOfferProps): JSX.Element {
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const style = {
    width: `${offer.rating * 20}%`,
  };
  const classNameFavoritesButton = `place-card__bookmark-button ${offer.isFavorite ? `${FAVORITE_BUTTON_ACTIVE_CLASS} ` : ''}button`;
  const images = offer.images as string[];
  const photo = (images.length > 0) ? images[0] : '';
  const route = AppRoute.Room.slice(0, AppRoute.Room.indexOf(':'));

  const handleFavoritesButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
    onFavoritesButtonClick(evt);
  };

  return (
    <article className="favorites__card place-card">
      {offer.isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> :
        ''}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${route}${offer.id}`}>
          <img className="place-card__image" src={photo} width="150" height="110" alt="Place"></img>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button data-id={offer?.id} className={classNameFavoritesButton} type="button"
            onClick={handleFavoritesButtonClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={style}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to="#">{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default FavoritesCard;
