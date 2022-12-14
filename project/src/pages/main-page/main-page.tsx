import { memo, MouseEvent } from 'react';

import MainContent from '../../components/main-content/main-content';

type MainPageProps = {
  onFavoritesButtonClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}

function MainPage({ onFavoritesButtonClick }: MainPageProps): JSX.Element {
  return (
    <MainContent onFavoritesButtonClick={onFavoritesButtonClick} />
  );
}

export default memo(MainPage);
