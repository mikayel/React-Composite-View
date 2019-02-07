'use strict'

import React, {lazy} from 'react'

const Header = lazy(() => import('../header/Header'));
const Footer = lazy(() => import('../footer/Footer'));
import { useGlobalStateContext } from '../GlobalState'

function two(props) {
    let [globalState, setGlobalState] = useGlobalStateContext();

    return (
        <div className="page page_two">
            <Header />
                Two
                <button onClick={() => setGlobalState({a:"18px"})} style={{fontSize: globalState.a}}>
                    Change global state {globalState.a}
                </button>
            <Footer />
        </div>
    );
}
export default two;