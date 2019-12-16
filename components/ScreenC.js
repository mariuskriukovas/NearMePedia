import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet,ScrollView } from 'react-native';
import WikiArticle from "./subcomponents/WikiArticle";
import {customStyles, Logo, TopSeparator} from "./StylingElements";
import {connect} from "react-redux";
import {distanceCoordinates} from "../api/locationApi"
import {addingToFavoriteList, removingFromFavoriteList} from "../stateManagement/ArticlesReducer";


class ScreenC extends React.Component {
    state = {
        isCurrentCoordinatesAvailable :false
    };

    constructor(props)
    {
        super(props)
    }

    componentDidUpdate(prevProps) {
        if (!(this.props.presentCoords === prevProps.presentCoords)) {
            this.setState({isCurrentCoordinatesAvailable:true})
        }
    }

    countDistance(x)
    {
        let distance = 0
        if(this.state.isCurrentCoordinatesAvailable)
        {
            distance = distanceCoordinates(this.props.presentCoords.lat, this.props.presentCoords.long, x.coord.lat, x.coord.long ,"K")
            distance = distance *1000
            distance = parseInt(distance)
        }
        return distance
    }

    render() {
        return(
            <View style={customStyles.basicLayout}>
                <TopSeparator/>
                <Logo/>
                <ScrollView>
                    {
                        this.props.favoriteList.map(
                            (x,index)=>
                            {
                                return (<WikiArticle key = {index}
                                                     info = {x}
                                                     distance = {this.countDistance(x)}
                                />)
                            }
                        )
                    }
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return{
        presentCoords:state.reducerForWikiArticles.presentCoords,
        favoriteList:state.reducerForWikiArticles.favoriteList,
    }
}
export default connect(mapStateToProps,{addingToFavoriteList, removingFromFavoriteList})(ScreenC)
