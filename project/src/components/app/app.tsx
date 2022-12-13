import { MouseEvent } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { useAppSelector } from '../../hooks';
import { store } from '../../store/index';
import {
  AppRoute,
  FAVORITE_BUTTON_ACTIVE_CLASS,
  ROOM_FAVORITE_BUTTON_ACTIVE_CLASS,
} from '../../utils/constants';
import { FavoritePostData } from '../../types/types';
import { postFavoriteStatus } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import RoomPage from '../../pages/room-page/room-page';
import PrivateRoute from '../../components/private-route/private-route';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const onOfferCardFavoritesButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const offerId: number | undefined = Number(evt.currentTarget.dataset.id);
    const status = Number(!( evt.currentTarget.classList.contains(FAVORITE_BUTTON_ACTIVE_CLASS) ||
      evt.currentTarget.classList.contains(ROOM_FAVORITE_BUTTON_ACTIVE_CLASS) ));

    if (offerId) {
      const favoritePostData: FavoritePostData = {
        offerId,
        status,
      };
      store.dispatch(postFavoriteStatus(favoritePostData));
    }
  };

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <MainPage
                onFavoritesButtonClick={onOfferCardFavoritesButtonClick}
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
              <PrivateRoute authorizationStatus={authorizationStatus} >
                <FavoritesPage onFavoritesButtonClick={onOfferCardFavoritesButtonClick} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Room}
            element={
              <RoomPage
                onFavoritesButtonClick={onOfferCardFavoritesButtonClick}
              />
            }
          />
          <Route
            path={AppRoute.Login}
            element={<NotFoundPage />}
          />
          <Route
            path={'*'}
            element={<NotFoundPage />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
