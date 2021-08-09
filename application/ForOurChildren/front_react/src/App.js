import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Content from './pages/UserList';
import Transaction from './pages/Transaction';
import TransactionAll from './pages/TransactionAll';
import Badges from './pages/Badges';
import Header from './pages/Header';
import NotFound from './pages/Notfound';
import Footer from './pages/Footer';
import UserList from './pages/UserList';

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
import Home from './pages/Home';

// import './css/index.scss';

function App() {
  const GlobalStyles = createGlobalStyle`
    ${reset};
    `;
  return (
    <BrowserRouter>
      <GlobalStyles/> {/*css init*/}
      <Header/>
      <Switch>
        <Route path="/transactionLogAll" exact component={TransactionAll}/>
        <Route path="/getTransaction/:name" exact component={Transaction}/>
        <Route path="/user" exact component={UserList} />
        <Route path="/" exact component={Home}/>
        <Route path={"*"} component={NotFound} />
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
