'use strict'

import React from 'react'

import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

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
