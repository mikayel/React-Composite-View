'use strict'

import React, {lazy} from 'react'

const Header = lazy(() => import('../header/Header'));
const Footer = lazy(() => import('../footer/Footer'));

function blank(props) {
  return (
    <div className="page_blank">
      <Header />
        Blank
      <Footer />
    </div>
  );
}

export default blank;