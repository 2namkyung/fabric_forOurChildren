import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Transaction from './pages/Transaction';
import TransactionAll from './pages/TransactionAll';
import Header from './pages/Header';
import NotFound from './pages/Notfound';
import Footer from './pages/Footer';
import UserList from './pages/UserList';
import Home from './pages/Home';
import Explorer from './pages/Explorer';

import StoreListStateProvider from './providers/StoreListStateProvider';

import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import './css/common.css';
import './css/header.css';
import './css/content.css';
import './css/badges.css';
import './css/footer.css';
import './css/notfound.css';
import './css/home.css';
import './css/storeList.css';
import './css/explorer.css';

// import './css/index.scss';

function App() {
  const GlobalStyles = createGlobalStyle`
    ${reset};
    `;
  return (
    <BrowserRouter>
      <GlobalStyles /> {/*css init*/}
      <StoreListStateProvider>
        <Header />
        <Switch>
          <Route path="/transactionLogAll" component={TransactionAll} />
          <Route path="/getTransaction/:name" component={Transaction} />
          <Route path="/explorer" component={Explorer} />
          <Route path="/user" component={UserList} />
          <Route path="/" exact component={Home} />
          <Route path={"*"} component={NotFound} />
        </Switch>
        <Footer />
      </StoreListStateProvider>
    </BrowserRouter>
  );
}

export default App;
