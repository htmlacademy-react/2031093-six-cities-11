import { memo, MouseEvent } from 'react';

import { Offer } from '../../types/types';
import MainContent from '../../components/main-content/main-content';

type MainPageProps = {
  hoveredOffer: Offer | undefined;
  setHoveredOffer: React.Dispatch<React.SetStateAction<Offer | undefined>>;
  onFavoritesButtonClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}

function MainPage({ hoveredOffer, setHoveredOffer, onFavoritesButtonClick }: MainPageProps): JSX.Element {
  return (
    <MainContent
      hoveredOffer={hoveredOffer}
      setHoveredOffer={setHoveredOffer}
      onFavoritesButtonClick={onFavoritesButtonClick}
    />
  );
}

export default memo(MainPage);
