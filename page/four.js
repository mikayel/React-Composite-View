'use strict'

import React, {lazy} from 'react'

const Header = lazy(() => import('../header/Header'));
const Footer = lazy(() => import('../footer/Footer'));

class Four extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <div className="page_four">
        <Header />
        Four
        <Footer />
      </div>
    );
  }
}

export default Four
