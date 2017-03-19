'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Bundle from './components/Bundle'
import Home from './pages/Home'

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/one" component={PageOne} />
      <Route path="/two" component={PageTwo}/>
    </div>
  </Router>
)

const Loading = () => (
  <div className="bundle_loading">Loading...</div>
)

const PageOne = (props) => (
  <Bundle load={require('bundle-loader?lazy!./pages/One')} {...props}>
    {(Comp) => (Comp
      ? <Comp/>
      : <Loading/>
    )}
  </Bundle>
)

const PageTwo = (props) => (
  <Bundle load={require('bundle-loader?lazy!./pages/Two')} {...props}>
    {(Comp) => (Comp
      ? <Comp/>
      : <Loading/>
    )}
  </Bundle>
)

/*
const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)
*/
ReactDOM.render( <App />, document.getElementById('appWrapper'));
