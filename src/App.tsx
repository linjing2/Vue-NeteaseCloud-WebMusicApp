import './App.css';
import Layout from './layout/index';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import StoreProvider from './store/storeProvider';
import store from './store/AppStore';
import {observer} from 'mobx-react';

function App() {
  return (
    <Provider store={store}>
      <StoreProvider store={store}>
        <div className="App">
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </div>
      </StoreProvider>
    </Provider>
  );
}

export default App;
