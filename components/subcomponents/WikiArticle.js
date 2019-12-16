import React, { Component } from 'react';
import {Text, View,TouchableOpacity } from 'react-native';
import {customStyles, EmptySeparator, wikiArticleStyles} from "../StylingElements";
import {Linking} from "expo";
import {connect} from "react-redux";
import ImageComponent from "./ImageComponent";
import IconsComponent from "./IconsComponent";
import {createURLToGetWikiImage, createURLToWikiOpen, getWikiImage} from "../../api/wikiApi";
import {addingToFavoriteList, removingFromFavoriteList} from "../../stateManagement/ArticlesReducer";

const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Wikipedia-logo-en-big.png/627px-Wikipedia-logo-en-big.png"

class WikiArticle extends React.Component {
    state = {
        isFavorite:false,
        photoURL:defaultImage
    };
    constructor(props)
    {
        super(props)
        this.createImage = this.createImage.bind(this)
    }

    checkIFavorite()
    {
        const ifFavorite = this.props.favoriteList.some(arrVal => this.props.info.pageId === arrVal.pageId)
        this.setState({isFavorite:ifFavorite})
        this.createImage()
    }

    componentDidMount() {
        this.checkIFavorite()
    }

    componentDidUpdate(prevProps) {
        if(!(this.props.info.title === prevProps.info.title))
        {
            this.checkIFavorite()
            this.createImage()
        }
    }

    selectIconName() {
        if(this.state.isFavorite) return 'md-star'
        else return 'md-star-outline'
    }

    createImage()
    {
        const url = createURLToGetWikiImage(this.props.info.title)
        getWikiImage(url).then(r => {
            if(r!==null)this.setState({photoURL:r})
            else this.setState({photoURL:defaultImage})
        })
    }

    openWikiWeb()
    {
        const url = createURLToWikiOpen(this.props.info.pageId)
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            }
            else {
                //console.log("Don't know how to open URI: " + url);
            }})
    }

    clickIcon()
    {
        if(this.state.isFavorite)
        {
            this.props.removingFromFavoriteList(this.props.info)
            this.setState((prevState) => ({isFavorite: ! prevState.isFavorite}))
        }
        else
        {
            this.props.addingToFavoriteList(this.props.info)
            this.setState((prevState) => ({isFavorite: ! prevState.isFavorite}))
        }
    }

    render() {
        return(
            <View>
                <View style={customStyles.customView}>
                    <View style={wikiArticleStyles.customView}>
                        <TouchableOpacity   onPress={()=>{this.openWikiWeb()}}>
                            <Text style={wikiArticleStyles.textStyle} >{this.props.info.title}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={wikiArticleStyles.secondView}>
                        <ImageComponent photoURL = {this.state.photoURL}/>
                        <View style={wikiArticleStyles.distanceView}>
                            <Text>{this.props.distance}</Text>
                        </View>
                        <IconsComponent name = {this.selectIconName()} style={wikiArticleStyles.iconView} callback = {()=>{this.clickIcon()}}/>
                    </View>
                </View>
               <EmptySeparator/>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return{
        favoriteList:state.reducerForWikiArticles.favoriteList,
    }
}

export default connect(mapStateToProps,{addingToFavoriteList, removingFromFavoriteList})(WikiArticle)
