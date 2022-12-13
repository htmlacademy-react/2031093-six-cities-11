import { memo } from 'react';

import { CITIES } from '../../utils/constants';
import { useAppSelector } from '../../hooks/index';
import { getCity } from '../../store/app-process/selectors';
import LocationsListItem from '../../components/locations-list-item/locations-list-item';

type LocationsListProps = {
  onLocationClick: (cityName: string) => void;
}

function LocationsList({ onLocationClick }: LocationsListProps): JSX.Element {
  const currentCity: string = useAppSelector(getCity);

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city: string) => (
        <LocationsListItem
          city={city}
          onLocationClick={onLocationClick}
          isActive={currentCity === city}
          key={`location-${city}`}
        />
      ))}
    </ul>
  );
}

export default memo(LocationsList);
