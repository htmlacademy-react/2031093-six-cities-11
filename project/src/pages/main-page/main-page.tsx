import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/action';
import { City, Offer } from '../../types/types';
import * as Const from '../../utils/constants';
import LoadingScreen from '../loading-screen/loading-screen';
import LocationsList from '../../components/locations-list/locations-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import Nav from '../../components/nav/nav';
import OffersList from '../../components/offers-list/offers-list';
import SortList from '../../components/sort-list/sort-list';
import MainEmpty from '../../components/main-empty/main-empty';

const MAP_HEIGHT = '850px';

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

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const offers: Offer[] = useAppSelector((state) => state.offers);
  const currentCityName: string = useAppSelector((state) => state.city);
  const sortType: Const.SortType = useAppSelector((state) => state.sortType);
  const sortedCityOffers = getSortedCityOffers(offers, currentCityName, sortType);
  const placesQty = sortedCityOffers.length;
  const selectedCity: City | undefined = sortedCityOffers
    .map((offer) => offer.city)
    .find((city) => city.name === currentCityName);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  const [hoveredOffer, setHoveredOffer] = useState<Offer | undefined>(
    undefined
  );

  const onLocationClick = (cityName: string) => {
    dispatch(changeCity(cityName));
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
            <Nav />
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
          {sortedCityOffers.length ? <MainEmpty /> : (
            <div className="cities__places-container container">
              <section className="cities__places places">
                {isOffersDataLoading ? <LoadingScreen /> : (
                  <>
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{placesQty} places to stay in {currentCityName}</b>
                    <SortList />
                    <div className="cities__places-list places__list tabs__content">
                      <OffersList
                        offers={sortedCityOffers}
                        parent={'cities'}
                        setHoveredOffer={setHoveredOffer}
                      />
                    </div>
                  </>)}
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
            </div>)}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
