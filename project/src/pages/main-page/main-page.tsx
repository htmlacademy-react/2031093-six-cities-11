import { MouseEvent } from 'react';

import {
  checkAuthAction,
  fetchFavoriteOffersAction,
  fetchOffersAction
} from '../../store/api-actions';
import { store } from '../../store/index';

import MainContent from '../../components/main-content/main-content';

type MainPageProps = {
  onFavoritesButtonClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}

function MainPage({ onFavoritesButtonClick }: MainPageProps): JSX.Element {
  store.dispatch(checkAuthAction());
  store.dispatch(fetchOffersAction());
  store.dispatch(fetchFavoriteOffersAction());

  return (
    <MainContent onFavoritesButtonClick={onFavoritesButtonClick} />
  );
}

export default MainPage;
