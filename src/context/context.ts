import { createContext, useContext } from 'react';

const defaultValue = {};
const AppContext = createContext(defaultValue);

export function useLocalContext() {
    return useContext(AppContext);
}

export default AppContext;