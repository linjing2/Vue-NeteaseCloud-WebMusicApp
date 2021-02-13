import React, {createContext} from 'react';
import store from './AppStore';

export const storeContext = createContext({});

const StoreProvider:React.FC = ({children=null}) => {
    return (
        <storeContext.Provider value={store}>
            {children}
        </storeContext.Provider>
    )
}

export default StoreProvider;