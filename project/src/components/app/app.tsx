import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../utils/constants';
import { Comment } from '../../types/types';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import RoomPage from '../../pages/room-page/room-page';
import PrivateRoute from '../../components/private-route/private-route';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

type AppProps = {
  comments: Comment[];
};

function App({ comments }: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus} >
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Room}
            element={
              <RoomPage
                comments={comments}
                onOfferReviewFormSubmit={() => {
                  throw new Error('Function \'onAnswer\' isn\'t implemented.');
                }}
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
