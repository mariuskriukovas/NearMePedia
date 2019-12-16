import React from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as IntentLauncherAndroid from "expo-intent-launcher";
import {MyAlert} from "../components/StylingElements";
import {coordinates} from "../stateManagement/AddressReducer";

export const getCurrentCoordinates = async () => {
    const coords = {latitude: "", longitude: ""}
    const getDeviceLocation = async () => {
        let checkPermission = await Permissions.askAsync(Permissions.LOCATION);
        if (checkPermission.status !== 'granted') {
            throw 'Permission to access location was denied'
        }
        if (! await Location.hasServicesEnabledAsync()) {
            throw 'Location.hasServicesEnabledAsync'
        }
        // IntentLauncherAndroid.startActivityAsync(
        //     IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
        // );
        const result = await Location.getCurrentPositionAsync({enableHighAccuracy: true })
        return result.coords
    };
    const location = await getDeviceLocation()
    coords.latitude = location.latitude
    coords.longitude = location.longitude
    return coords
}

export const createURLToGetAddress = (latitude, longitude)=>
{
    let token = "04df76e3297f05"
    let adr = "https://eu1.locationiq.com/v1/reverse.php?key="
    adr = adr + token
    adr = adr + "&lat=" + latitude
    adr = adr + "&lon=" + longitude
    adr = adr + "&format=json"
    return adr
}

export const createURLToCoordinatesFromAddress = (address)=>
{
    let adr = "https://eu1.locationiq.com/v1/search.php?key=04df76e3297f05&q="
    adr = adr + encodeURI(address)
    adr = adr + "&format=json"
    return adr
}

export const createURLToAutoComplete = (text)=>
{
    let adr = "http://autocomplete.geocoder.api.here.com/6.2/suggest.json?query="
    adr = adr + text
    adr = adr + "&app_id=MUwo7pc3086AZv9q56a4&app_code=U4rXqOmLQh3wJRHpysk_VA"
    return adr
}


//copied from internet
export const distanceCoordinates = (lat1, lon1, lat2, lon2, unit)=>
{
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        let radlat1 = Math.PI * lat1/180;
        let radlat2 = Math.PI * lat2/180;
        let theta = lon1-lon2;
        let radtheta = Math.PI * theta/180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}

export const getAddressSuggestion = async (reqURL) => {
    return new Promise(resolve => {
        const axios = require("axios");
        axios
            .get(reqURL)
            .then(response => {
                const reducer = (accumulator, currentValue) => accumulator + " " + currentValue;
                let address = response.data.suggestions.map(
                    (element, index) => {
                        return element.label
                    }
                )
                resolve(address)
            })
            .catch(function (error) {
                MyAlert("Not successful api request",error)
                console.log(reqURL)
                resolve(null)
            })

    });
}

export const getCoordinatesFromAddress = async (reqURL) => {
    return new Promise(resolve => {
        const axios = require("axios");
        axios
            .get(reqURL)
            .then(response => {
                resolve(coordinates(response.data[0].lat,response.data[0].lon))
            })
            .catch(function (error) {
                MyAlert("Not successful api request",error)
                console.log(reqURL)
                resolve(null)
            })
    });

}

export const getAddressFromCoordinates = async (reqURL) => {
    return new Promise(resolve => {
        const axios = require("axios");
        axios
            .get(reqURL)
            .then(response => {
                resolve(response.data.display_name)
            })
            .catch(function (error) {
                MyAlert("Not successful api request",error)
                console.log(reqURL)
                resolve(null)
            })

    });

}

//AIzaSyCOfG7DGXK0rcSIj6qaktaCSWegSZ4rsK4
//https://maps.googleapis.com/maps/api/geocode/json?address=Winnetka&bounds=34.172684,-118.604794|34.236144,-118.500938&key=AIzaSyCOfG7DGXK0rcSIj6qaktaCSWegSZ4rsK4
//http://autocomplete.geocoder.api.here.com/6.2/suggest.json?query=Berli&app_id=MUwo7pc3086AZv9q56a4&app_code=U4rXqOmLQh3wJRHpysk_VA
//https://en.wikipedia.org/w/api.php?action=query&format=json&prop=coordinates%7Cpageimages&generator=geosearch&ggscoord=37.7891838%7C-122.4033522
// http://autocomplete.geocoder.api.here.com/6.2/suggest.json?query=Berli&app_id=xLKbLPNcW5oI8zu8kIDg&app_code=cVO6XP1T1nww6ekfw4ssklDv4K4Uo9Qf2O_VEFgJsoA
// http://autocomplete.geocoder.api.here.com/6.2/suggest.json?query=Pariser+1+Berl&app_id=MUwo7pc3086AZv9q56a4&app_code=U4rXqOmLQh3wJRHpysk_VA
//https://eu1.locationiq.com/v1/search.php?key=04df76e3297f05&q=Edmonton%Canada%20Alberta&format=json
//https://eu1.locationiq.com/v1/reverse.php?key=04df76e3297f05&lat=46.5025159&lon=11.3304726&format=json
// http://autocomplete.geocoder.api.here.com/6.2/suggest.json?query=Berli&app_id=xLKbLPNcW5oI8zu8kIDg&app_code=cVO6XP1T1nww6ekfw4ssklDv4K4Uo9Qf2O_VEFgJsoA
// http://autocomplete.geocoder.api.here.com/6.2/suggest.json?query=Berli&app_id=MUwo7pc3086AZv9q56a4&app_code=U4rXqOmLQh3wJRHpysk_VA
// https://en.wikipedia.org/w/api.php?action=query&format=json&prop=coordinates%7Cpageimages&generator=geosearch&ggscoord=37.7891838%7C-122.4033522
//https://eu1.locationiq.com/v1/reverse.php?key=04df76e3297f05&lat=46.5025159&lon=11.3304726&format=json
