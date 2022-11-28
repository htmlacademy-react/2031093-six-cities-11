import { Link } from 'react-router-dom';
import { CityOffers } from '../../utils/props';
import FavoritesLocations from '../../components/favorites-locations/favorites-locations';
import Logo from '../../components/logo/logo';
import Nav from '../../components/nav/nav';

function FavoritesPage(citiesOffers: CityOffers[]): JSX.Element {

  return (
    <div className="page">
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
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {/* Place for favorites locations */}
              {Object.values(citiesOffers).map((cityOffers: CityOffers) => FavoritesLocations(cityOffers))}
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
