import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { useAppDispatch } from '../../hooks';
import { changeCity, loadOffers, changeOffer } from '../../store/action';
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

  const onLocationClick = (cityName: string) => {
    dispatch(changeCity(cityName));
    dispatch(loadOffers(offers
      .filter((offer) => offer.city.name === cityName)));
  };

  const onListItemClick = (listItemId: string) => {
    const newOffer = offers.find((offer) => offer.id === listItemId);
    if (newOffer) {
      dispatch(changeOffer(newOffer));
    }
  };

  const favoritesQty = offers.filter((offer) => offer.isFavorite).length;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <MainPage
                onLocationClick={onLocationClick}
                onOfferCardClick={onListItemClick}
                favoritesQty={favoritesQty}
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
                <FavoritesPage
                  onOfferCardClick={onListItemClick}
                />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Room}
            element={
              <RoomPage
                comments={comments}
                favoritesQty={favoritesQty}
                onOfferCardClick={onListItemClick}
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
