import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContainer } from 'containers';
import { store } from 'reducers';
import { PrivateLayout } from 'layouts';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <AppContainer>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<PrivateLayout />} />
          </Routes>
        </BrowserRouter>
      </AppContainer>
    </ReduxProvider>
  );
};

export default App;
