import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Tickers from "./pages/Tickers";
import Portfolio from "./pages/Portfolio";
import Detail from "./pages/Detail";
import Scenarios from "./pages/Scenarios";
import NoMatch from "./pages/NoMatch";
import NavBar from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Tickers} />
          <Route exact path="/tickers" component={Tickers} />
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/scenarios" component={Scenarios} />     
          <Route exact path="/tickers/:id" component={Detail} />
          <Route path="*" /><NoMatch />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
