import React from 'react';
import { Link } from 'react-router'

const NavBar = props => {
  return(
    <div>
      <nav className="top-bar" data-topbar role="navigation">
        <Link to='/bills'> Home </Link>
        <a href='/signout'> Sign Out </a>
      </nav>
      {props.children}
    </div>
  )
}

export default NavBar;
