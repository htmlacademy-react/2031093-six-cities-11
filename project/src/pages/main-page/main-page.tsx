import { MouseEvent } from 'react';

import { useAppSelector } from '../../hooks';
import {
  fetchOffersAction,
  fetchFavoriteOffersAction,
} from '../../store/api-actions';
import { store } from '../../store/index';
import { getAuthLoggedStatus } from '../../store/user-process/selectors';
import MainContent from '../../components/main-content/main-content';

type MainPageProps = {
  onFavoritesButtonClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}

function MainPage({ onFavoritesButtonClick }: MainPageProps): JSX.Element {
  const isUserLogged = useAppSelector(getAuthLoggedStatus);

  store.dispatch(fetchOffersAction());
  if (isUserLogged) {
    store.dispatch(fetchFavoriteOffersAction());
  }

  return (
    <MainContent onFavoritesButtonClick={onFavoritesButtonClick} />
  );
}

export default MainPage;
