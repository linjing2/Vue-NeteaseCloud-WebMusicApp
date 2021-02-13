import React, {createContext} from 'react';
import store, {Store} from './AppStore';


type StoreProviderProps = {
    store: Store;
    children?: React.ReactElement;
  };

export const storeContext = createContext({});

const StoreProvider:React.FC<StoreProviderProps> = ({children, store}) => {
    return (
        <storeContext.Provider value={store}>
            {children}
        </storeContext.Provider>
    )
}

export default StoreProvider;