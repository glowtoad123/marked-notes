export function setSelectedCard(nr) {
    return {
        type: "setSelectedCard",
        payload: nr
    }
}

export function setLoadingNewPageCondition(){
    return {
        type: "setLoadingNewPageCondition"
    }
}