import React, { Component } from 'react';
import {TextInput, Text, View, StyleSheet, ScrollView, Button, Picker} from 'react-native';
import {
    createURLToAutoComplete,
    getAddressSuggestion,
} from "../api/locationApi";
import {customStyles, EmptySeparator, MyButton, TopSeparator} from "./StylingElements";
import Address from "./subcomponents/Address";

export default class AddressInput extends React.Component {
    state = {
        address:"",
        addressArr:[],
    };

    constructor(props)
    {
        super(props)
        this.myCallback = this.myCallback.bind(this)
        this.navigateToA = this.navigateToA.bind(this)
    }


    componentWillMount(text) {
        const reqURL = createURLToAutoComplete(encodeURI(text))
        if(text) {
            //const response = getAddressSuggestion(reqURL,this.myCallback)
            getAddressSuggestion(reqURL).then(r=>this.setState({addressArr:r}))
         }
    }

    myCallback(arr)
    {
        this.setState({addressArr:arr})
    }

    navigateToA()
    {
        this.props.navigation.navigate("ScreenA")
    }

    render() {
        return(
            <View style={customStyles.basicLayout}>
                <TopSeparator/>
                <EmptySeparator/>
                <TextInput
                    style={{ height: 40, width:'80%', borderColor: 'royalblue',  borderRadius:10, borderWidth: 2, }}
                    onChangeText={ (text) => {
                        this.setState({address:text})
                        this.componentWillMount(text)}
                    }
                    value={this.state.address}
                />
                <EmptySeparator/>
                <ScrollView>
                    {this.state.addressArr.map(
                        (x, index)=>{
                            return (<Address key = {index}
                                             address = {x}
                                             coordinate = {null}
                                             navigate = {()=> this.props.navigation.navigate("ScreenA")}
                            />)
                    }
                    )}
                </ScrollView>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                    <MyButton text = {"Go back"} callback = {() => this.props.navigation.navigate('AllAddress')}/>
                </View>
            </View>
        )
    }
}
