import { useAppSelector } from '../../hooks/index';
import { CITIES } from '../../utils/constants';
import LocationsListItem from '../../components/locations-list-item/locations-list-item';

type LocationsListProps = {
  onLocationClick: (cityName: string) => void;
}

function LocationsList({ onLocationClick }: LocationsListProps): JSX.Element {
  const currentCity: string = useAppSelector((state) => state.city);

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

export default LocationsList;
