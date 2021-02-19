const newPageReducer = (state = false, action) => {
    switch(action.type){
        case 'setLoadingNewPageCondition':
            return !state

        default: return state
    }
}

export default newPageReducer