import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, ScrollView} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {addressStyles, customStyles, EmptySeparator, wikiArticleStyles} from "../StylingElements";
import {connect} from "react-redux";
import IconsComponent from "./IconsComponent";
import {createURLToCoordinatesFromAddress, getCoordinatesFromAddress} from "../../api/locationApi";
import {addingNewCoordinates, coordinateElement, removingOldCoordinates} from "../../stateManagement/AddressReducer";
import {changeCurrentCoordinates} from "../../stateManagement/ArticlesReducer";


class Address extends React.Component
{
    state = {
        isFavorite:false,
    };

    constructor(props)
    {
        super(props)
    }

    componentDidMount() {

        const ifFavorite = this.props.coordinatesList.some(arrVal => this.props.address === arrVal.address)
        this.setState({isFavorite:ifFavorite})
    }

    selectIconName() {
        if(this.state.isFavorite) return 'md-star'
        else return 'md-star-outline'
    }

    clickFavoriteIcon()
    {
        if(this.state.isFavorite)
        {
            this.props.removingOldCoordinates(coordinateElement(this.props.address, this.props.coordinate))
            this.setState((prevState) => ({isFavorite: ! prevState.isFavorite}))
        }
        else
        {
            this.props.addingNewCoordinates(coordinateElement(this.props.address,  this.props.coordinate))
            this.setState((prevState) => ({isFavorite: ! prevState.isFavorite}));
        }
    }

    clickGoToIcon()
    {
        if(this.props.coordinate === null)
        {
            let url = createURLToCoordinatesFromAddress(this.props.address)
            console.log(url)
            getCoordinatesFromAddress(url).then(r=>
                this.props.changeCurrentCoordinates(r)
            )
        }
        else{
            this.props.changeCurrentCoordinates(this.props.coordinate)
        }
        this.props.navigate()
    }

    render() {
        return (
            <View>
                <View style={{...customStyles.customView, flexDirection: 'row',}}>
                    <View style={{width: '70%',}}>
                        {this.props.isCurrent ?
                            <View style = {customStyles.customView}>
                                <Text style={addressStyles.specialTextForCurrentCoordinates}> Current </Text>
                            </View>
                            :null}
                        <ScrollView contentContainerStyle={addressStyles.scrollView}>
                            <Text>{this.props.address}</Text>
                        </ScrollView>
                    </View>
                    <IconsComponent name = {'md-arrow-dropright-circle'} style={addressStyles.iconView}
                                    callback = {() => {this.clickGoToIcon()}}/>
                    <IconsComponent name = {this.selectIconName()} style={addressStyles.iconView}
                                    callback = {() => {this.clickFavoriteIcon()}}
                    />
                </View>
                <EmptySeparator/>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return{
        coordinatesList:state.reducerForWikiCoordinates.coordinatesList,
    }
}

export default connect(mapStateToProps,{addingNewCoordinates, removingOldCoordinates, changeCurrentCoordinates})(Address)
