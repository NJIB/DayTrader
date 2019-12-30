import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Tickers from "./pages/Tickers";
import Portfolio from "./pages/Portfolio";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Tickers} />
          <Route exact path="/tickers" component={Tickers} />
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/tickers/:id" component={Detail} />
          <Route path="*" /><NoMatch />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
