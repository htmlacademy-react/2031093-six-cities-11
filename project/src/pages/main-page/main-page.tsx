import { Helmet } from 'react-helmet-async';
import { City, Offer } from '../../types/types';
import { CITIES } from '../../utils/constants';
import LocationsListItem from '../../components/locations-list-item/locations-list-item';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import Nav from '../../components/nav/nav';
import OffersList from '../../components/offers-list/offers-list';

type MainPageProps = {
  offers: Offer[];
  currentCity: string;
  onLocationClick: (cityName: string) => void;
  selectedOffer: Offer | undefined;
  onListItemHover: (listItemName: string) => void;
}

const MAP_HEIGHT = '850px';

function MainPage({ offers, currentCity, onLocationClick, selectedOffer, onListItemHover }: MainPageProps): JSX.Element {
  const placesQty = offers.length;

  const cityOffers: Offer[] = offers.filter((offer) => currentCity && offer.city.name === currentCity);
  const selectedCity: City | undefined = offers.map((offer) => offer.city).find((city) => city.name === currentCity);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Six cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Nav />
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((city: string) => (
                <LocationsListItem
                  city={city}
                  onLocationClick={onLocationClick}
                  isActive={currentCity === city}
                  key={`location-${city}`}
                />
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesQty} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <OffersList
                  offers={cityOffers}
                  onListItemHover={onListItemHover}
                  parent={'cities'}
                />
              </div>
            </section>
            <div id="map" className="cities__right-section">
              <section className="cities__map map">
                {cityOffers && (cityOffers.length > 0) && selectedCity && (
                  <Map
                    city={selectedCity}
                    offers={cityOffers}
                    selectedOffer={selectedOffer}
                    height={MAP_HEIGHT}
                  />
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
