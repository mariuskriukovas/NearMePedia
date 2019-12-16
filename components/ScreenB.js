import React, { Component } from 'react';
import {View, Button, ScrollView} from 'react-native';
import AddressInput from "./AddressInput";
import {createURLToGetAddress, getAddressFromCoordinates, getCurrentCoordinates} from "../api/locationApi";
import {customStyles, Logo, MyAlert, MyButton, TopSeparator} from "./StylingElements";
import {connect} from "react-redux";
import Address from "./subcomponents/Address";
import {coordinates} from "../stateManagement/AddressReducer";
import {changeCurrentCoordinates} from "../stateManagement/ArticlesReducer";

class ScreenB extends Component {
    state = {
        currentLocation:null,
    };

    constructor(props)
    {
        super(props)
    }

    addCurrent()
    {
        getCurrentCoordinates().then(
            (response)=>
            {
                const newCoords = coordinates(response.latitude, response.longitude)
                this.props.changeCurrentCoordinates(newCoords)
                const url = createURLToGetAddress(response.latitude, response.longitude)
                getAddressFromCoordinates(url).then(r =>
                    this.setState({currentLocation:
                     (<Address address = {r}
                               coordinate = {newCoords}
                               navigate = {()=> this.props.navigation.navigate("ScreenA")}
                               isCurrent={true}
                        />)
                }))
            })
            .catch(function (error) {
            MyAlert("Current location not available ",error)
            console.log(error)
        })
    }

    render() {
        if (this.state.input)return (<AddressInput/>)
        else return(
            <View style={customStyles.basicLayout}>
                <TopSeparator/>
                <Logo/>
                <ScrollView>
                    {this.state.currentLocation}
                    {this.props.allLocations.map(
                        (x, index)=>
                        {
                            return (<Address key = {index}
                                             address = {x.address}
                                             coordinate = {x.coordinate}
                                             navigate = {()=> this.props.navigation.navigate("ScreenA")}
                            />)
                        }
                    )}
                </ScrollView>
                <View style={{width: 50, height: 10, }} />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                    <MyButton text = {"Add current"} callback = {() => this.addCurrent()}/>
                    <MyButton text = {"Add new"} callback = {() => this.props.navigation.navigate('Input')}/>
                </View>
                <View style={{width: 50, height: 20, }} />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return{
        presentCoords:state.reducerForWikiArticles.presentCoords,
        allLocations:state.reducerForWikiCoordinates.coordinatesList
    }
}

export default connect(mapStateToProps,{changeCurrentCoordinates})(ScreenB)
