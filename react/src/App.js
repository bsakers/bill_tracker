import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import BillsIndexContainer from './containers/BillsIndexContainer';
import NewBillContainer from './containers/NewBillContainer';
import HomePageContainer from './containers/HomePageContainer';
import NavBar from './components/NavBar';


const App = (props) => {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={HomePageContainer}/>
      <Route path='/bills' component={NavBar}>
        <IndexRoute component={BillsIndexContainer}/>
        <Route path='/bills/new' component={NewBillContainer}/>
      </Route>
    </Router>
  )
}

export default App;
