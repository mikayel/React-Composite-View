'use strict';

import React, {Suspense, lazy} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Loading from './component/loading/Loading'
import {GlobalStateProvider} from './GlobalState'

const PageNotFound = lazy(() => import('./PageNotFound'));


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
                            <Redirect exact path="/" to="/home"  />
                            <Route path="/:page" component={PageWrapper} />
                        </Switch>
                    </Router>
                </Suspense>
            </GlobalStateProvider>);
    }
}

class PageWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PageComponent: null,
            hasPageNotFoundError: false,
            hasError: false };
    }

    static getDerivedStateFromError(error) {
        if (error.toString().search(/Cannot find module/i) !== -1 ) {
            return { hasError: false, hasPageNotFoundError: true };
        } else {
            return { hasError: true, hasPageNotFoundError: false };
        }
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }

    componentDidMount() {
        let page = this.props.match.params.page;
        let PageComponent = lazy(() => import(`./page/${page}`));
        this.setState({PageComponent: PageComponent});
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.page !==  prevProps.match.params.page) {
            let page = this.props.match.params.page;
            let PageComponent = lazy(() => import(`./page/${page}`));
            if (prevState.hasPageNotFoundError) {
                this.setState({PageComponent: PageComponent, hasError: false, hasPageNotFoundError:false});
            } else {
                this.setState({PageComponent: PageComponent});
            }
        }
    }

    render() {
        if (this.state.hasPageNotFoundError) {
            return (<PageNotFound {...this.props} />);
        }
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        let PageComponent = this.state.PageComponent;
        if (PageComponent == null) {
            return <div>Loading...</div>
        } else {
            return (<PageComponent {...this.props} />)
        }
    }
}

ReactDOM.render(
    <App />, document.getElementById("appWrapper")
);