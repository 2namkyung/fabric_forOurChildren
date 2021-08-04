import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Content from './pages/Content';
import Transaction from './pages/Transaction';
import Badges from './pages/Badges';
import Header from './pages/Header';
import NotFound from './pages/Notfound';

import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import './css/common.css';
import './css/header.css';
import './css/content.css';
import './css/badges.css';
import './css/footer.css';
import './css/notfound.css';
import Footer from './pages/Footer';
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
        <Route path="/getTransaction/:name" component={Transaction}/>
        <Route path="/" exact component={Content} />
        <Route path={"*"} component={NotFound} />
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
