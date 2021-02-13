import {storeContext} from './storeProvider';
import {useContext} from 'react';

const useStores = (name: string) => {
    const store = useContext(storeContext);

    if(!store){
        return new Error();
    }

    return name ? store[name] : null;
}
export default useStores;