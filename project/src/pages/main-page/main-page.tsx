import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { useAppSelector } from '../../hooks/index';
import { City, Offer } from '../../types/types';
import * as Const from '../../utils/constants';
import LocationsList from '../../components/locations-list/locations-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import Nav from '../../components/nav/nav';
import OffersList from '../../components/offers-list/offers-list';
import SortList from '../../components/sort-list/sort-list';

const MAP_HEIGHT = '850px';

type MainPageProps = {
  onLocationClick: (cityName: string) => void;
  onOfferCardClick: (offerId: string) => void;
  favoritesQty: number;
}

const getCityOffers = (offers: Offer[], currentCityName: string): Offer[] => offers.filter((o) => o.city.name === currentCityName);

const getSortedOffers = (offers: Offer[], sortType: Const.SortType): Offer[] => {
  let sortedOffers: Offer[] = [];

  switch (sortType) {
    case Const.SortType.PriceLowToHigh:
      sortedOffers = offers.slice().sort((o1: Offer, o2: Offer) => o1.price - o2.price);
      break;
    case Const.SortType.PriceHighToLow:
      sortedOffers = offers.slice().sort((o1: Offer, o2: Offer) => o2.price - o1.price);
      break;
    case Const.SortType.TopRatedFirst:
      sortedOffers = offers.slice().sort((o1: Offer, o2: Offer) => o2.rating - o1.rating);
      break;
    case Const.SortType.Popular:
    default:
      sortedOffers = offers.slice();
      break;
  }

  return sortedOffers;
};

const getSortedCityOffers = (offers: Offer[], currentCityName: string, sortType: Const.SortType): Offer[] => getSortedOffers(getCityOffers(offers, currentCityName), sortType);

function MainPage({ onLocationClick, onOfferCardClick, favoritesQty }: MainPageProps): JSX.Element {
  const allOffers: Offer[] = useAppSelector((state) => state.offers);
  const currentCityName: string = useAppSelector((state) => state.city);
  const sortType: Const.SortType = useAppSelector((state) => state.sortType);
  const sortedCityOffers = getSortedCityOffers(allOffers, currentCityName, sortType);
  const placesQty = sortedCityOffers.length;
  const selectedCity: City | undefined = sortedCityOffers
    .map((offer) => offer.city)
    .find((city) => city.name === currentCityName);

  const [hoveredOffer, setHoveredOffer] = useState<Offer | undefined>(
    undefined
  );

  const onOfferCardHover = (offerId: string) => {
    setHoveredOffer(sortedCityOffers.find((offer) => offer.id === offerId));
  };

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
              onLocationClick={onLocationClick}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesQty} places to stay in {currentCityName}</b>
              <SortList />
              <div className="cities__places-list places__list tabs__content">
                <OffersList
                  offers={sortedCityOffers}
                  parent={'cities'}
                  onOfferCardHover={onOfferCardHover}
                  onOfferCardClick={onOfferCardClick}
                />
              </div>
            </section>
            <div id="map" className="cities__right-section">
              <section className="cities__map map">
                {selectedCity && sortedCityOffers && (
                  <Map
                    city={selectedCity}
                    offers={sortedCityOffers}
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
