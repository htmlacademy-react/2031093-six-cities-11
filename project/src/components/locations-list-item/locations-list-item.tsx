import { Link } from 'react-router-dom';

type LocationsListItemProps = {
  city: string;
  isActive?: boolean;
}

function LocationsListItem({ city, isActive = true }: LocationsListItemProps): JSX.Element {
  const className = `locations__item-link tabs__item${isActive ? ' tabs__item--active' : ''}`;
  return (
    <li className="locations__item">
      <Link className={className} to="#">
        <span>{city}</span>
      </Link>
    </li>
  );
}

export default LocationsListItem;
