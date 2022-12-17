import { MouseEvent, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/app-process/app-process';
import { City, Offer } from '../../types/types';
import { getOffers, getIsOffersDataLoading } from '../../store/data-process/selectors';
import { getCity, getSortType } from '../../store/app-process/selectors';
import * as Const from '../../utils/constants';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import LocationsList from '../locations-list/locations-list';
import Logo from '../logo/logo';
import Map from '../map/map';
import Nav from '../nav/nav';
import OffersList from '../offers-list/offers-list';
import SortList from '../sort-list/sort-list';
import MainEmpty from '../main-empty/main-empty';

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

type MainContentProps = {
  hoveredOffer: Offer | undefined;
  setHoveredOffer: React.Dispatch<React.SetStateAction<Offer | undefined>>;
  onFavoritesButtonClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}

function MainContent({ hoveredOffer, setHoveredOffer, onFavoritesButtonClick }: MainContentProps): JSX.Element {
  const dispatch = useAppDispatch();

  const offers: Offer[] = useAppSelector(getOffers);
  const currentCityName: string = useAppSelector(getCity);
  const sortType: Const.SortType = useAppSelector(getSortType);
  const sortedCityOffers = getSortedCityOffers(offers, currentCityName, sortType);
  const placesQty = sortedCityOffers.length;
  const selectedCity: City | undefined = sortedCityOffers
    .map((o) => o.city)
    .find((city) => city.name === currentCityName);
  const isOffersDataLoading = useAppSelector(getIsOffersDataLoading);

  const onLocationClick = useCallback((cityName: string) => {
    dispatch(changeCity(cityName));
  }, [dispatch]);

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
          {!sortedCityOffers.length ? <MainEmpty /> : (
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
                        onFavoritesButtonClick={onFavoritesButtonClick}
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

export default MainContent;
