import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Content from './pages/content';
import Transaction from './pages/transaction';
import Badges from './pages/badges';
import Header from './pages/header';

import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import './css/common.css';
import './css/header.css';
import './css/content.css';
import './css/badges.css';
// import './css/index.scss';

function App() {
  const GlobalStyles = createGlobalStyle`
    ${reset};
    `;
  return (
    <BrowserRouter>
      <GlobalStyles/>
      <Header/>
      <Badges/>
      <Switch>
        <Route path="/getTransaction/:name" exact component={Transaction}/>
        <Route path="/" exact component={Content} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
