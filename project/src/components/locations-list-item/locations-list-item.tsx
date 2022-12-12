import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

type LocationsListItemProps = {
  city: string;
  onLocationClick: (cityName: string) => void;
  isActive?: boolean;
}

function LocationsListItem({ city, onLocationClick, isActive = true }: LocationsListItemProps): JSX.Element {
  const className = `locations__item-link tabs__item${isActive ? ' tabs__item--active' : ''}`;

  const handleLocationClick = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();

    const cardTitleElement: HTMLLIElement | null = evt.currentTarget.querySelector('.locations__item-link span');
    if (cardTitleElement) {
      onLocationClick(cardTitleElement.innerText);
    }
  };

  return (
    <li className="locations__item" onClick={handleLocationClick}>
      <Link className={className} to="#">
        <span>{city}</span>
      </Link>
    </li>
  );
}

export default LocationsListItem;
