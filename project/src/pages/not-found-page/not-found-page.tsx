import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function NotFoundPage(): JSX.Element {
  return (
    <section className="game">
      <Helmet>
        <title>Six cities. 404. Page not found</title>
      </Helmet>
      <header className="game__header">

        <section className="game__screen">
          <h1>404. Page not found</h1>
          <Link to="/">Вернуться на главную</Link>
        </section>
      </header>
    </section>
  );
}

export default NotFoundPage;
