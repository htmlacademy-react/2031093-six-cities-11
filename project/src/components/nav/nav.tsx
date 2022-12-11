import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../utils/constants';
import { logoutAction } from '../../store/api-actions';

function Nav(): JSX.Element {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const favoritesQty: number = useAppSelector((state) => state.favoriteOffers)
    .filter((o) => o.isFavorite).length;
  const signMessage = isAuthorized ? 'Sign out' : 'Sign in';
  const userEmail = isAuthorized ? user.email : '' ;
  const userAvatar = !(isAuthorized && user.avatarUrl) ? ''
    : <img className="user__avatar" src={user.avatarUrl} width="74" height="74" alt="User avatar"></img>;

  const handlerSignOutClick = () => {
    if (isAuthorized) {
      dispatch(logoutAction());
    }
  };

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
              <span className="header__favorite-count">{favoritesQty}</span>
            </Link>
            : ''}
        </li>
        <li className="header__nav-item"
          onClick={handlerSignOutClick}
        >
          <Link className="header__nav-link" to={`${AppRoute.Login}`}>
            <span className="header__signout">{signMessage}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
