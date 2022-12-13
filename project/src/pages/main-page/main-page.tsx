import { MouseEvent } from 'react';

import { useAppSelector } from '../../hooks';
import {
  fetchFavoriteOffersAction,
  fetchOffersAction
} from '../../store/api-actions';
import { store } from '../../store/index';
import MainContent from '../../components/main-content/main-content';
import { AuthorizationStatus } from '../../utils/constants';

type MainPageProps = {
  onFavoritesButtonClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}

function MainPage({ onFavoritesButtonClick }: MainPageProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  store.dispatch(fetchOffersAction());
  if (authorizationStatus === AuthorizationStatus.Auth) {
    store.dispatch(fetchFavoriteOffersAction());
  }

  return (
    <MainContent onFavoritesButtonClick={onFavoritesButtonClick} />
  );
}

export default MainPage;
