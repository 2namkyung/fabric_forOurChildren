import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Transaction from './pages/Transaction';
import TransactionAll from './pages/TransactionAll';
import Header from './pages/Header';
import NotFound from './pages/Notfound';
import Footer from './pages/Footer';
import UserList from './pages/UserList';
import Home from './pages/Home';
import Explorer from './pages/Explorer';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Info from './pages/Info';
import Transfer from './pages/Transfer';
import PrivateRoute from './lib/PrivateRoute';

import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import './css/info.css';
import './css/common.css';
import './css/header.css';
import './css/content.css';
import './css/badges.css';
import './css/footer.css';
import './css/notfound.css';
import './css/home.css';
import './css/storeList.css';
import './css/explorer.css';
import './css/signup.css';
import './css/login.css';
import './css/transfer.css';
import './css/pagination.css';


// import './css/index.scss';
function App() {
  const GlobalStyles = createGlobalStyle`
    ${reset};
    `;
  return (
    <BrowserRouter>
      <GlobalStyles /> {/*css init*/}
      <Header />
      <Switch>
        <PrivateRoute path="/transactionLogAll" component={TransactionAll} />
        <PrivateRoute path="/getTransaction/:name" component={Transaction} />
        <PrivateRoute path="/user" component={UserList} />
        <PrivateRoute path="/transfer" component={Transfer} />
        <PrivateRoute path="/info/:name" component={Info} />
        
        <Route path="/explorer" component={Explorer} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" exact component={Home} />
        <Route path={"*"} component={NotFound} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
