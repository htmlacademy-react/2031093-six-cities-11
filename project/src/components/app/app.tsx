import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity, changeOffer } from '../../store/action';
import { AppRoute, AuthorizationStatus } from '../../utils/constants';
import { Offer, Comment } from '../../types/types';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import RoomPage from '../../pages/room-page/room-page';
import PrivateRoute from '../../components/private-route/private-route';

type AppProps = {
  offers: Offer[];
  comments: Comment[];
};

function App({ offers, comments }: AppProps): JSX.Element {
  const dispatch = useAppDispatch();

  const currentCity = useAppSelector((state) => state.city);
  const onLocationClick = (cityName: string) => {
    dispatch(changeCity(cityName));
  };

  const selectedOffer = useAppSelector((state) => state.offer);
  const onListItemHover = (listItemName: string) => {
    const newOffer = offers.find((offer) => offer.title === listItemName);
    if (newOffer) {
      dispatch(changeOffer(newOffer));
    }
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <MainPage
                offers={offers}
                currentCity={currentCity}
                onLocationClick={onLocationClick}
                selectedOffer={selectedOffer}
                onListItemHover={onListItemHover}
              />
            }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth} >
                <FavoritesPage offers={offers} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Room}
            element={
              <RoomPage
                offers={offers}
                selectedOffer={selectedOffer}
                onListItemHover={onListItemHover}
                comments={comments}
                onOfferReviewFormSubmit={() => {
                  throw new Error('Function \'onAnswer\' isn\'t implemented.');
                }}
              />
            }
          />
          <Route
            path={'*'}
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
