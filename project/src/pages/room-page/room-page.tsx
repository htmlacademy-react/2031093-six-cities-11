import { MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { getOffers, getIsOffersDataLoading } from '../../store/data-process/selectors';
import {
  fetchOffersAction,
  fetchFavoriteOffersAction,
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const offers = useAppSelector(getOffers);
  const isOffersDataLoading = useAppSelector(getIsOffersDataLoading);
  const offerId = Number(window.location.pathname.split('/').pop());

  if (!offers.find((o) => o.id === offerId)) {
    navigate(AppRoute.NotFound);
  }

  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(fetchFavoriteOffersAction());

    dispatch(fetchOfferAction(offerId));
    dispatch(fetchNearbyOffersAction(offerId));
    dispatch(fetchCommentsAction(offerId));
  }, [dispatch, offerId]);

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
