import React from "react";
import {NavLink} from "react-router-dom";
import './Navigation.scss';


export default class Navigation extends React.Component {
  render() {
    return (
      <div className='Navigation'>
        <NavLink to='/signup'>
          <div className='NavItem'>
            Sign up
          </div>
        </NavLink>
        <NavLink to='/login'>
          <div className='NavItem'>
            Login
          </div>
        </NavLink>
      </div>
    )
  }
}