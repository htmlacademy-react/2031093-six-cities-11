import { Link } from 'react-router-dom';
import { Offer } from '../../utils/props';

type FavoriteOfferProps = {
  offer: Offer;
}

function FavoritesCard({offer}: FavoriteOfferProps): JSX.Element {
  const style = {
    width: offer.rating,
  };
  const index = 0;
  const photo = (offer.photos.length > 0) ? offer.photos[index] : '';

  return (
    <article className="favorites__card place-card">
      {offer.isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> :
        ''}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to="#">
          <img className="place-card__image" src={photo} width="150" height="110" alt="Place image"></img>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
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
