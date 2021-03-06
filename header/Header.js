'use strict'

import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <div className="header">
    <h2>Header</h2>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/one">One</Link></li>
      <li><Link to="/two">Two</Link></li>
      <li><Link to="/three">Three</Link></li>
      <li><Link to="/four">Four</Link></li>
      <li><Link to="/404">Page not found</Link></li>
    </ul>
  </div>
)

export default Header
