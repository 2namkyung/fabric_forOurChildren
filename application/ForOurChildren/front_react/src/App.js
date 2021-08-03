import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Index from './pages/index';
import Transaction from './pages/transaction';
import './css/index.css';
import Header from './pages/header';
// import './css/index.scss';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route path="/getTransaction/:name" exact component={Transaction}/>
        <Route path="/" exact component={Index} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
