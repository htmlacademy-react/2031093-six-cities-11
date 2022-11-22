import MainPage from '../../pages/main-page/main-page';
import { Offer } from '../../utils/props';

function App(offers: Offer[]): JSX.Element {
  return (
    <MainPage {...offers} />
  );
}

export default App;
