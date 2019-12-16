import {MyAlert} from "../components/StylingElements";
import {wikiElement} from "../stateManagement/ArticlesReducer";
import {coordinates} from "../stateManagement/AddressReducer";

export const createURLToGetWikiNearby = (latitude, longitude)=>
{
    let adr = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=geosearch&gscoord="
    adr = adr + latitude
    adr = adr + "%7C" + longitude
    adr = adr + "&gsradius=10000&gslimit=10"
    return adr
}

export const createURLToGetWikiImage = (title)=>
{
    let url = "https://en.wikipedia.org/w/api.php?action=query&titles="
    url = url + encodeURI(title)
    url = url + "&prop=pageimages&format=json&pithumbsize=500"
    return url
}

export const createURLToWikiOpen = (pageId)=>
{
    let url = "https://en.wikipedia.org/?curid="
    url = url + pageId
    return url
}


export const getWikiImage = async (reqURL) => {
    return new Promise(resolve => {
        const axios = require("axios");
        axios
            .get(reqURL)
            .then(response => {
                const objectKey = Object.keys(response.data.query.pages)[0]
                resolve(response.data.query.pages[objectKey].thumbnail.source)
            })
            .catch(function (error) {
                //not all pages has images
                resolve(null)
            })
    })
}

export const getWikiNearByList = async (reqURL) => {
    return new Promise(resolve => {
        const axios = require("axios");
        axios
            .get(reqURL)
            .then(response => {
                const result =
                response.data.query.geosearch.map(
                    (x, index) => {
                        return {...wikiElement(x.pageid, x.title, coordinates(x.lat,x.lon)), distance:x.dist}
                    }
                )
                resolve(result)
            })
            .catch(function (error) {
                MyAlert("Not successful api request",error)
                console.log(reqURL)
                resolve(null)
            })
    })
}
