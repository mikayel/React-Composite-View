'use strict'

import React, {lazy} from 'react'
const Header = lazy(() => import('./header/Header'));

export default class PageNotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="page_404">
                <Header />
                <h2>ERROR 404</h2>
                <h3>Page Not Found</h3>
            </div>
        );
    }
}