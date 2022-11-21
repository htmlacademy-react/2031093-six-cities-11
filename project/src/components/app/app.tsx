import { MainPageProps } from '../../utils/props';
import MainPage from '../../pages/main-page/main-page';

function App({isPremium, rating}: MainPageProps): JSX.Element {
  return (
    <MainPage isPremium={isPremium} rating={rating} />
  );
}

export default App;
