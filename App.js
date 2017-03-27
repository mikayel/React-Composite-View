'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Bundle from './components/Bundle'
import Home from './pages/Home'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/one" component={PageOne} />
      <Route path="/two" component={PageTwo}/>
      <Route path="/:page" component={PageWrapper}/>
    </Switch>
  </Router>
)

const Loading = () => (
  <div className="bundle_loading">Loading...</div>
)
const NotFound  = () => (
  <div className="not_found">Page Not Found</div>
)

const PageOne = (props) => (
  <Bundle load={require('bundle-loader?lazy!./pages/One')}>
    {(Comp) => (Comp
      ? <Comp/>
      : <Loading/>
    )}
  </Bundle>
)

const PageTwo = (props) => (
  <Bundle load={require('bundle-loader?lazy!./pages/Two')}>
    {(Comp) => (Comp
      ? <Comp/>
      : <Loading/>
    )}
  </Bundle>
)

class PageWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ImportedPage: Loading
    };
  }

  componentDidMount() {
    this.importPage(this.props.match.params.page);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.page != this.props.match.params.page) {
      this.importPage(nextProps.match.params.page);
    }
  }

  importPage(page) {
    import(`./pages/${page}`).then(function(mod) {
      if (mod.default) {
        this.setState({"ImportedPage": mod.default});
      } else {
        this.setState({"ImportedPage": NotFound});
      }
    }.bind(this)).catch(function(e) {
      this.setState({"ImportedPage": NotFound});
    }.bind(this));
  }

  render() {
    return (<this.state.ImportedPage />)
  }
}

ReactDOM.render( <App />, document.getElementById('appWrapper'));
