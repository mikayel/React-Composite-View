'use strict'

import React, {lazy} from 'react'

const Header = lazy(() => import('../header/Header'));
const Footer = lazy(() => import('../footer/Footer'));

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page_home">
        <Header />
        Home
        <Footer />
      </div>
    );
  }
}

export default Home;