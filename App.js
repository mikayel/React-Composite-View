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


async function importPage(pageName) {
    try {
        let page = await import(`./pages/${pageName}`);
        console.log(page);
    } catch(err) {
        console.error("template error");
        return null;
    }
}
// xxx to do
const PageWrapper = ({ match }) => {
  let mod = importPage(match.params.page);
  let Ret = mod.default ? mod.default : Loading;

  return <div><Ret /></div>;
}

ReactDOM.render( <App />, document.getElementById('appWrapper'));
