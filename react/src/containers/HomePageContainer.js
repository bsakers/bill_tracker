import React, { Component } from 'react';
import { Link } from 'react-router';

class HomePageContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.refreshPage=this.refreshPage.bind(this)
  }

  refreshPage() {
    window.location.reload()
  }

  render() {
    return(
      <div className="row align-center homePage">
        <h1>Bill Tracker</h1>
        <h3>Bills suck, but at least we can help</h3>
        <h4>Start by signing in below</h4>
        <div className="row signInButton">
          <Link to={`/auth/google_oauth2`} onClick={this.refreshPage}>Sign In With Google</Link>
        </div>
      </div>
    )
  }
}

export default HomePageContainer;
