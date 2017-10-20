import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import BillsIndexContainer from './containers/BillsIndexContainer'


const App = (props) => {
  return(
    <Router history={browserHistory}>
      <Route path='/bills' component={BillsIndexContainer}>
      </Route>
    </Router>
  )
}

export default App;
