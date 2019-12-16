import React from 'react';
import Navigation from "./components/Navigation";
import {Provider} from "react-redux"
import {AsyncStorage} from "react-native";
import { PersistGate } from 'redux-persist/integration/react';
import { AppRegistry } from 'react-native';
import {myPersistor, myStore} from "./stateManagement/reducers";

const store = myStore
const persistor = myPersistor

export default class App extends React.Component{

    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <Navigation/>
                </PersistGate>
            </Provider>
        );
    }
}
