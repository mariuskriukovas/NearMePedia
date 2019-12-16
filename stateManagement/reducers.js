import {combineReducers, createStore} from 'redux'
import {reducerForWikiArticles} from "./ArticlesReducer";
import {reducerForWikiCoordinates} from "./AddressReducer";
import {AsyncStorage} from "react-native";
import {persistReducer, persistStore} from "redux-persist";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['user'],
};

const myReducers = combineReducers( {reducerForWikiArticles, reducerForWikiCoordinates})
const myPersistedReducer = persistReducer(persistConfig,  myReducers);


export const myStore = createStore(myPersistedReducer);
export const myPersistor = persistStore(myStore);
