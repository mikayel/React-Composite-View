'use strict';

import React from 'react'

const GlobalStateContext = React.createContext({globalState: {}, setGlobalState: () => {} });

export function withGlobalState(Component) {
    return function WrapperComponent(props) {
        return (
            <GlobalStateContext.Consumer>
                {(contexts) => <Component {...props} {...contexts} />}
            </GlobalStateContext.Consumer>
        )
    }
}

export const GlobalStateProvider = GlobalStateContext.Provider;
export const GlobalStateConsumer = GlobalStateContext.Consumer;