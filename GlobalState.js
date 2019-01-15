'use strict';

import React from 'react'

const GlobalStateContext = React.createContext({globalState: {}, setGlobalState: () => {} });

export const GlobalStateProvider = GlobalStateContext.Provider;
export const GlobalStateConsumer = GlobalStateContext.Consumer;