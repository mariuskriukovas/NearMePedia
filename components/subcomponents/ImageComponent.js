import React from "react";
import {Image, View} from "react-native";
import {wikiArticleStyles} from "../StylingElements";


export default class ImageComponent extends React.Component {
    render() {
        return(
            <View style={wikiArticleStyles.imageView}>
                <Image
                    source={{
                        uri: this.props.photoURL,
                    }}
                    style={{ width: '75%', height: '75%'}}
                />
            </View>
        )
    }
}
