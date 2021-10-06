import React, {useEffect} from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Money from './view/Money';
import Chart from './view/Chart';
import Statistics from './view/Statistics';

function App() {
  useEffect(() => {
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  },[])
  return (
    <Router>
      <Switch>
        <Route path="/money">
          <Money/>
        </Route>
        <Route path="/chart">
          <Chart/>
        </Route>
        <Route path="/statistics">
          <Statistics/>
        </Route>
        <Redirect exact from="/" to="/statistics"/>
      </Switch>
    </Router>
  );
}

export default App;