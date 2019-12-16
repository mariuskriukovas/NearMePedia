import React from "react";
import {Image, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";


export default class IconsComponent extends React.Component {
    render() {
        return(
            <View style={this.props.style}>
                <TouchableOpacity  onPress={this.props.callback}>
                    <Ionicons name={this.props.name} size={30} color={'royalblue'} />
                </TouchableOpacity>
            </View>
        )
    }
}
