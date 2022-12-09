import { CITIES } from '../../utils/constants';
import LocationsListItem from '../../components/locations-list-item/locations-list-item';

type LocationsListProps = {
  currentCity: string;
  onLocationClick: (cityName: string) => void;
}

function LocationsList({ currentCity, onLocationClick }: LocationsListProps): JSX.Element {

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
