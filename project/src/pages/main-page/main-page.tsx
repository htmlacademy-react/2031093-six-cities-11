import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { City, Offer } from '../../types/types';
import LocationsList from '../../components/locations-list/locations-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import Nav from '../../components/nav/nav';
import OffersList from '../../components/offers-list/offers-list';

type MainPageProps = {
  offers: Offer[];
  currentCity: string;
  onLocationClick: (cityName: string) => void;
  onOfferCardClick: (offerId: string) => void;
  favoritesQty: number;
}

const MAP_HEIGHT = '850px';

function MainPage({ offers, currentCity, onLocationClick, onOfferCardClick, favoritesQty }: MainPageProps): JSX.Element {
  const placesQty = offers.length;

  const [hoveredOffer, setHoveredOffer] = useState<Offer | undefined>(
    undefined
  );

  const onOfferCardHover = (offerId: string) => {
    setHoveredOffer(offers.find((offer) => offer.id === offerId));
  };

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
            <Nav offersQty={favoritesQty} />
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList
              currentCity={currentCity}
              onLocationClick={onLocationClick}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesQty} places to stay in {currentCity}</b>
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
                  parent={'cities'}
                  onOfferCardHover={onOfferCardHover}
                  onOfferCardClick={onOfferCardClick}
                />
              </div>
            </section>
            <div id="map" className="cities__right-section">
              <section className="cities__map map">
                {selectedCity && cityOffers && (
                  <Map
                    city={selectedCity}
                    offers={cityOffers}
                    selectedOffer={hoveredOffer}
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
