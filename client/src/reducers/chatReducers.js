let initialState = {
    chats:[],
    selectedChat:null
}

export const chatReducers = (state=initialState,action) => {
    switch(action.type){
        case "ALL_CHATS_REQUEST":
            return {
                loading:true,
                chats:[]
            }
        case "ALL_CHATS_SUCCESS":
            return {
                loading:false,
                chats:action.payload
            }
        case "ALL_CHATS_FAIL":
            return {
                loading:false,
                error:action.payload
            }
        case "CLEAR_ERROR":
            return {
                error:null
            }
        case "SELECT_CHAT":
            return {
                ...state,
                selectedChat:action.payload
            }
        default:
            return state
    }
}

