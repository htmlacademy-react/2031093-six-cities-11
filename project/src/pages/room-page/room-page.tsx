import { MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { useAppSelector } from '../../hooks/index';
import { store } from '../../store/index';
import {
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
} from '../../store/api-actions';
import { AppRoute } from '../../utils/constants';
import Logo from '../../components/logo/logo';
import Nav from '../../components/nav/nav';
import LoadingScreen from '../loading-screen/loading-screen';
import RoomMain from '../../components/room-main/room-main';

type RoomPageProps = {
  onFavoritesButtonClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}

function RoomPage({ onFavoritesButtonClick }: RoomPageProps): JSX.Element {
  const navigate = useNavigate();

  const offers = useAppSelector((state) => state.offers);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const offerID = Number(window.location.pathname.split('/').pop());

  if (!offers.find((offer) => offer.id === offerID)) {
    navigate(AppRoute.NotFound);
  }

  useEffect(() => {
    store.dispatch(fetchOfferAction(offerID));
    store.dispatch(fetchNearbyOffersAction(offerID));
    store.dispatch(fetchCommentsAction(offerID));
  }, [offerID]);

  return (
    <div className="page">
      <Helmet>
        <title>Six cities. Offer overview</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Nav />
          </div>
        </div>
      </header>
      {isOffersDataLoading
        ?
        <LoadingScreen />
        :
        <RoomMain
          onFavoritesButtonClick={onFavoritesButtonClick}
        />}
    </div>
  );
}

export default RoomPage;
