export const coordinates = (lat, long)=> {return  {lat, long}};
export const coordinateElement = (address, coordinate)=> {return  {address, coordinate}};

export const coordinatesExample = ()=> {
    return  {
        coordinatesList:[]
    }
};

export const addingNewCoordinates = (newElement)=>
{
    return{
        type:'ADDINGNEWCOORDINATES',
        payload:newElement
    }
}

export const removingOldCoordinates = (newElement)=>
{
    return{
        type:'REMOVINGOLDCOORDINATES',
        payload:newElement
    }
}


export const  reducerForWikiCoordinates = (state = coordinatesExample(), action)=>
{
    let newState = null
    switch (action.type) {
        case 'ADDINGNEWCOORDINATES':
            const ifExists = state.coordinatesList.some(element => action.payload.address === element.address)
            if(ifExists)return state
            else {
                newState = {...state}
                newState.coordinatesList = [...newState.coordinatesList, action.payload]
                return newState
            }
        case 'REMOVINGOLDCOORDINATES':
            let newArr = state.coordinatesList.filter(element => element.address !== action.payload.address)
            newState = {...state, favoriteList:newArr}
            return newState
        default:
            return state
    }
}
