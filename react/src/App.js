import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import BillsIndexContainer from './containers/BillsIndexContainer';
import NewBillContainer from './containers/NewBillContainer';


const App = (props) => {
  return(
    <Router history={browserHistory}>
      <Route path='/bills' component={BillsIndexContainer}/>
      <Route path='/bills/new' component={NewBillContainer}/>
    </Router>
  )
}

export default App;
