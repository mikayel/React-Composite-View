'use strict';

import React, {Suspense, lazy} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Loading from './component/loading/Loading'
import {GlobalStateProvider} from './GlobalState'

const PageNotFound = lazy(() => import('./PageNotFound'));
const Home = lazy(() => import('./page/home'));

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setGlobalState = this.setState.bind(this);
    }

    render() {
        return (
            <GlobalStateProvider value={{"globalState": this.state, "setGlobalState": this.setGlobalState}}>
                <Suspense fallback={<Loading />}>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={()=> <Home />} />
                            <Route path="/:page" component={PageWrapper}/>
                        </Switch>
                    </Router>
                </Suspense>
            </GlobalStateProvider>);
    }
}

class PageWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        if (error.toString().search(/Cannot find module/i) !== -1 ) {
            return { hasError: true };
        } else {
            return { hasError: false };
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.hasError && prevProps.match.params.page != this.props.match.params.page) {
            this.setState({hasError:false});
        }
    }

    render() {
        let page = this.props.match.params.page;
        let PageComponent = lazy(() => import(`./page/${page}`));
        if (this.state.hasError) {
            return (<PageNotFound {...this.props} />);
        }
        return (<PageComponent {...this.props} />)
    }
}

ReactDOM.render(
    <App />, document.getElementById("appWrapper")
);