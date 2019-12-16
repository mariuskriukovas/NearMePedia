export const wikiElement = (pageId, title, coord)=> {return  {pageId, title, coord,}};

export const wikiArticlesExample = ()=> {
    return  {
        presentCoords:null,
        favoriteList:[]
    }
};

export const changeCurrentCoordinates = (coords)=>
{
    return{
        type:'CHANGECURRENTCOORDINATES',
        payload:coords
    }
}

export const addingToFavoriteList = (newElement)=>
{
    return{
        type:'ADDINGTOFAVORITELIST',
        payload:newElement
    }
}


export const removingFromFavoriteList = (newElement)=>
{
    return{
        type:'REMOVINGFROMFAVORITELIST',
        payload:newElement
    }
}

export const reducerForWikiArticles = (state = wikiArticlesExample(), action)=>
{
    let newState = null
    switch (action.type)
    {
        case "CHANGECURRENTCOORDINATES":
            newState = {...state}
            newState.presentCoords = action.payload
            return newState
        case "ADDINGTOFAVORITELIST":
            newState = {...state}
            newState.favoriteList = [...newState.favoriteList, action.payload]
            return newState
        case "REMOVINGFROMFAVORITELIST":
            let newArr = state.favoriteList.filter(element => element.pageId !== action.payload.pageId)
            newState = {...state, favoriteList:newArr}
            return newState
        default:
            return state
    }
}
