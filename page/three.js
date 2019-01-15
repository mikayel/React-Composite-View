'use strict'

import React, {lazy} from 'react'

const Header = lazy(() => import('../header/Header'));
const Footer = lazy(() => import('../footer/Footer'));

export default  class Three extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page_three">
        <Header />
        Three
        <Footer />
      </div>
    );
  }
}