const selectionReducer = (state = null, action) => {
    switch(action.type){
        case "setSelectedCard":
            let newState = action.payload
            return action.payload


        default: return null
    }
}


export default selectionReducer