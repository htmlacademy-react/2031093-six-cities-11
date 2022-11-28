import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import { Offer, CityOffers } from '../../utils/props';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import RoomPage from '../../pages/room-page/room-page';

type AppProps = {
  offers: Offer[];
  citiesOffers: CityOffers[];
};

function App({ offers, citiesOffers }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage {...offers} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={<FavoritesPage {...citiesOffers} />}
        />
        <Route
          path={AppRoute.Room}
          element={<RoomPage {...offers[0]} />}
        />
        <Route
          path={'*'}
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
