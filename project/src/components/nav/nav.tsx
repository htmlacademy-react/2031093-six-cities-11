import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../utils/constants';

type NavProps = {
  offersQty: number;
}

function Nav({ offersQty }: NavProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);

  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const signMessage = isAuthorized ? 'Sign out' : 'Sign in';
  const userEmail = isAuthorized ? user.email : '' ;
  const userAvatar = !(isAuthorized && user.avatarUrl) ? ''
    : <img className="user__avatar" src={user.avatarUrl} width="74" height="74" alt="User avatar"></img>;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          {isAuthorized ?
            <Link className="header__nav-link header__nav-link--profile" to={`${AppRoute.Favorites}`}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
                {userAvatar}
              </div>
              <span className="header__user-name user__name">{userEmail}</span>
              <span className="header__favorite-count">{offersQty}</span>
            </Link>
            : ''}
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" to={`${AppRoute.Login}`}>
            <span className="header__signout">{signMessage}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
