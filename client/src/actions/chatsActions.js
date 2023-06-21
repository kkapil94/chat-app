import axios from "axios"


export const getChats = ()=>async (dispatch)=>{
    try {
        const {token} = JSON.parse(localStorage.getItem("user"))
        dispatch({type:"ALL_CHATS_REQUEST"})
        const {data} = await axios.get("/api/v1/chat",{headers :{
            Authorization:`Bearer ${token}`
        }});
        dispatch({type:"ALL_CHATS_SUCCESS",payload:data})
    } catch(error) {
        dispatch({
            type:"ALL_CHATS_FAIL",
            payload:error
        })
    }
}

export const clearErrors = (dispatch)=>{
    dispatch({type:"CLEAR_ERRORS"})
}