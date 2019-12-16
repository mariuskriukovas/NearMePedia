import React from 'react';
import {View,ScrollView } from 'react-native';
import WikiArticle from "./subcomponents/WikiArticle";
import {customStyles, TopSeparator, Logo, MyAlert} from "./StylingElements";
import {connect} from "react-redux";
import {createURLToGetWikiNearby, getWikiNearByList} from "../api/wikiApi";


class ScreenA extends React.Component {
    state = {
        wikiArticles:[],
    };

    createWikiNearByList()
    {
        const lat = this.props.presentCoords.lat.toString()
        const long = this.props.presentCoords.long.toString()
        const url = createURLToGetWikiNearby(lat,long)
        getWikiNearByList(url).then(r => this.setState({wikiArticles:r}))
    }

    constructor(props)
    {
        super(props)
        this.createWikiNearByList = this.createWikiNearByList.bind(this)
        this.props.navigation.navigate("ScreenB")
    }

    componentDidMount() {}

    componentDidUpdate(prevProps) {
        if(!(this.props.presentCoords === prevProps.presentCoords))
        {
            this.createWikiNearByList()
        }
    }

    render() {
        return(
            <View style={customStyles.basicLayout}>
                <TopSeparator/>
                <Logo/>
                <ScrollView>
                    {this.state.wikiArticles.map(
                        (x,index)=>{
                            return (<WikiArticle key = {index}
                                                 info = {x}
                                                 distance = {x.distance}
                            />)}
                    )}
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

export default connect(mapStateToProps,null)(ScreenA)
