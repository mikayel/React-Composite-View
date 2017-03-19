'use strict'

import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <div className="footer">
    <h2>Footer</h2>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/one">One</Link></li>
      <li><Link to="/two">Two</Link></li>
    </ul>
  </div>
)

export default Footer
