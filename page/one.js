'use strict'

import React, {lazy} from 'react'

import {GlobalStateConsumer} from '../GlobalState'

const Header = lazy(() => import('../header/Header'));
const Footer = lazy(() => import('../footer/Footer'));

export default class One extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page_one">
        <Header />
        One
          {<GlobalStateConsumer>
              {({globalState, setGlobalState}) => {
                      return (
                          <button onClick={() => setGlobalState({a:"32px"})} style={{fontSize: globalState.a}}>
                              Change global state {globalState.a}
                          </button>
                      )
                  }
              }
          </GlobalStateConsumer>}
        <Footer />
      </div>
    );
  }
}