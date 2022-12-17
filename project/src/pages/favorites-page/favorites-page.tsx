import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppSelector } from '../../hooks/index';
import { getFavoriteOffers } from '../../store/data-process/selectors';
import { Offer } from '../../types/types';
import * as Const from '../../utils/constants';
import FavoritesLocations from '../../components/favorites-locations/favorites-locations';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import Logo from '../../components/logo/logo';
import Nav from '../../components/nav/nav';

type FavoritesPageProps = {
  onFavoritesButtonClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}

function FavoritesPage({ onFavoritesButtonClick }: FavoritesPageProps): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  return (
    <>
      <ToastContainer />
      <div className="page">
        <Helmet>
          <title>Six cities. Favorites</title>
        </Helmet>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <Logo />
              <Nav />
            </div>
          </div>
        </header>

        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            {!favoriteOffers.length ?
              <FavoritesEmpty /> :
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Const.CITIES.map((city) => {
                    const cityFavoriteOffers = Object.values(favoriteOffers).filter((offer: Offer) => offer.city.name === city);
                    return (cityFavoriteOffers.length > 0) && (
                      <FavoritesLocations
                        city={city}
                        cityFavoriteOffers={cityFavoriteOffers}
                        onFavoritesButtonClick={onFavoritesButtonClick}
                        key={city}
                      />
                    );
                  })}
                </ul>
              </section>}
          </div>
        </main>
        <footer className="footer container">
          <Link className="footer__logo-link" to="/">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"></img>
          </Link>
        </footer>
      </div>
    </>
  );
}

export default FavoritesPage;
