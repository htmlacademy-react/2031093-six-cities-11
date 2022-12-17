import { useRef, useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthLoggedStatus } from '../../store/user-process/selectors';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';
import { AppRoute, PASSWORD_REGEX, NOT_VALID_PASSWORD_ERROR } from '../../utils/constants';
import Logo from '../../components/logo/logo';

function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isUserLogged = useAppSelector(getAuthLoggedStatus);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isUserLogged) {
      navigate(AppRoute.Main);
    }
  }, [isUserLogged, navigate]);

  const showToastReviewPostErrorMessage = () => {
    toast.warning(NOT_VALID_PASSWORD_ERROR, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const onSubmit = (authData: AuthData) => {
    if (PASSWORD_REGEX.test(authData.password)) {
      dispatch(loginAction(authData));
    } else {
      showToastReviewPostErrorMessage();
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="page page--gray page--login">
        <Helmet>
          <title>Six cities. Login</title>
        </Helmet>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <Logo />
            </div>
          </div>
        </header>

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action=""
                onSubmit={handleSubmit}
              >
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required></input>
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required></input>
                </div>
                <button className="login__submit form__submit button" type="submit">
                  Sign in
                </button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to="#">
                  <span>Amsterdam</span>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default LoginPage;
