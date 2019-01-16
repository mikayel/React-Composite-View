'use strict'

import React from 'react'
import { Link } from 'react-router-dom'
import { withGlobalState } from "../GlobalState";

const Footer = (props) => (
  <div className="footer">
    <h2>Footer</h2>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/one">One</Link></li>
      <li><Link to="/two">Two</Link></li>
      <li><Link to="/three">Three</Link></li>
      <li><Link to="/four">Four</Link></li>
    </ul>
      <button onClick={() => props.setGlobalState({a:"24px"})} style={{fontSize: props.globalState.a}}>
          Change global state {props.globalState.a}
      </button>
  </div>
);

export default withGlobalState(Footer)
