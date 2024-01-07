let initialState = {
    chats:[],
    selectedChat:null,
    stream:null
}

export const chatReducers = (state=initialState,action) => {
    switch(action.type){
        case "ALL_CHATS_REQUEST":
            return {
                ...state,
                loading:true,
                chats:[]
            }
        case "ALL_CHATS_SUCCESS":
            return {
                ...state,
                loading:false,
                chats:action.payload
            }
        case "ALL_CHATS_FAIL":
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case "CLEAR_ERROR":
            return {
                ...state,
                error:null
            }
        case "CHAT_REQUEST":
            return{
                ...state,
                loading:true
            }
        case "SELECT_CHAT":
            return {
                ...state,
                loading:false,
                selectedChat:action.payload
            }
        case "CHAT_FAIL":
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case "GET_STREAM":
            return {
                ...state,
                stream:action.payload
            }
        case "END_STREAM":
            return {
                ...state,
                stream:null
            }
        default:
            return state
    }
}

