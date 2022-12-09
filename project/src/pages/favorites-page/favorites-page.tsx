import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/types';
import * as Const from '../../utils/constants';
import FavoritesLocations from '../../components/favorites-locations/favorites-locations';
import Logo from '../../components/logo/logo';
import Nav from '../../components/nav/nav';

type FavoritesPageProps = {
  offers: Offer[];
  onOfferCardClick: (offerId: string) => void;
}

function FavoritesPage({ offers, onOfferCardClick }: FavoritesPageProps): JSX.Element {
  const favoritesQty = offers.filter((offer) => offer.isFavorite).length;

  return (
    <div className="page">
      <Helmet>
        <title>Six cities. Favorites</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Nav offersQty={favoritesQty} />
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Const.CITIES.map((city) => {
                const favoriteOffers = Object.values(offers)
                  .filter((offer: Offer) => offer.city.name === city);
                return (favoriteOffers.length > 0) && (
                  <FavoritesLocations
                    offers={favoriteOffers}
                    city={city}
                    onOfferCardClick={onOfferCardClick}
                  />
                );
              })}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"></img>
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
