import MainPage from '../../pages/main-page/main-page';

function App({children}: React.PropsWithChildren): JSX.Element {
  return (
    <MainPage>
      {children}
    </MainPage>
  );
}

export default App;
