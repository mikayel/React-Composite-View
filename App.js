'use strict';

import React, {Suspense, lazy} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Loading from './component/loading/Loading'
import {GlobalStateProvider} from './GlobalState'

const PageNotFound = lazy(() => import('./PageNotFound'));
//const Home = lazy(() => import('./page/home'));

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

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
                            { /* <Route exact path="/" component={(props)=> <Home {...props} />} /> */}
                            <Route path="/login" component={Login} />
                            <PrivateRoute path="/private/:page" component={PageWrapper}/>
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
        if (prevState.hasPageNotFoundError && prevProps.match.params.page != this.props.match.params.page) {
            this.setState({hasError: false, hasPageNotFoundError:false});
        }

        if (this.props.match.params.page !==  prevProps.match.params.page) {
            let page = this.props.match.params.page;
            let PageComponent = lazy(() => import(`./page/${page}`));
            this.setState({PageComponent: PageComponent});
        }
    }

    render() {
        /*let page = this.props.match.params.page;
        let PageComponent = lazy(() => import(`./page/${page}`)); */
        if (this.state.hasPageNotFoundError) {
            return (<PageNotFound {...this.props} />);
        }
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        let PageComponent = this.state.PageComponent;
        if (PageComponent == null) {
            return <div>Loading... null</div>
        } else {
            return (<PageComponent {...this.props} />)
        }
    }
}

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                fakeAuth.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {redirectToReferrer: false};

        this.login = () => {
            fakeAuth.authenticate(() => {
                this.setState({redirectToReferrer: true});
            });
        };

        this.logout = () => {
            fakeAuth.signout(() => {
                this.setState({redirectToReferrer: false});
            });
        };
    }

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/one" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        if (fakeAuth.isAuthenticated) {
            return (
                <div>
                    <p>You are logged in!</p>
                    <button onClick={this.logout}>Log out</button>
                </div>
            );
        }

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}

ReactDOM.render(
    <App />, document.getElementById("appWrapper")
);