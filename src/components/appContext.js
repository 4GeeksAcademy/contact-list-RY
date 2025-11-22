import React, { useEffect,useReducer,useState} from "react"; 
import storeReducer, { initialStore } from "../store";

export const AppContext = React.createContext(null);

const injectContext = passedComponent => { 
    const StoreWrapper = props => {
        const [state,setState] = useState(initialStore);
         store: contact