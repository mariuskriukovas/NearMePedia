import React from "react";
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export const customStyles = StyleSheet.create({
    customView:{flex: 1,
        width: '97%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius:10,
        borderWidth: 2,
        borderColor: 'royalblue',
        backgroundColor: 'snow',
    },
    basicLayout:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export const wikiArticleStyles = StyleSheet.create({
    customView:{
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10,
    },
    textStyle:{
        color: 'royalblue',
        fontSize: 16,
    },
    secondView: {
        flex: 1,
        flexDirection: 'row'
    },
    imageView:{
        width: '75%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    distanceView: {
        width: '10%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconView:{
        width: '15%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export const addressStyles = StyleSheet.create({
    scrollView:{
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10,
    },
    iconView:{
        width: '15%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    specialTextForCurrentCoordinates: {
        fontSize:16,
        color:'royalblue',
    }
});


export const TopSeparator = ()=> {
    return(
        <View style={{
            width: '100%',
            height: 25,
            backgroundColor: 'gray',
        }}/>
        )
}

export const EmptySeparator = ()=> {
    return(
        <View style={{width: 50, height: 50, }} />
    )
}

export const Logo = () =>
{
    return(
        <Text style = {{
            fontSize:40,
            color:'royalblue',
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 10}}>
            NearMePedia
        </Text>
    )
}

export const MyAlert = (title, message) =>
{
    Alert.alert(
        title,
        message,
        [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
    );
}


export class MyButton extends React.Component
{
    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: 60,
                height: 50,
            }}>
                <TouchableOpacity onPress={this.props.callback}>
                    <View style={{
                        padding: 15,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'royalblue',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,
                        elevation: 4,
                    }}>
                        <Text style={{color: 'snow', fontSize: 12,}}>{this.props.text}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

