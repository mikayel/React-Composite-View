'use strict'

import React from 'react'

import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

class Two extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page_two">
        <Header />
        Two
        <Footer />
      </div>
    );
  }
}

export default Two
