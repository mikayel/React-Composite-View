'use strict'

import React from 'react'

import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

class Three extends React.Component {
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

export default Three
