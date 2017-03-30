'use strict'

import React from 'react'

import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

class One extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page_one">
        <Header />
        Three -> One
        <Footer />
      </div>
    );
  }
}

export default One
