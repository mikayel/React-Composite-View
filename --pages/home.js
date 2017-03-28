'use strict'

import React from 'react'

import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

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

export default Home
