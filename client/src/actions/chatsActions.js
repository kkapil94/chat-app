import axios from "axios"
const baseUrl = import.meta.env.VITE_BASE_URL
export const getChats = ()=>async (dispatch)=>{
    const user= JSON.parse(localStorage.getItem("user"))
    try {
        dispatch({type:"ALL_CHATS_REQUEST"})
        const {data} = await axios.get(`${baseUrl}/api/v1/chat`,{headers :{
            Authorization:`Bearer ${user&&user.token}`
        }});
        dispatch({type:"ALL_CHATS_SUCCESS",payload:data})
    } catch(error) {
        dispatch({
            type:"ALL_CHATS_FAIL",
            payload:error
        })
    }
}

export const clearErrors = ()=>(dispatch)=>{
    dispatch({type:"CLEAR_ERROR"})
}

export const selectChat = (id)=>async(dispatch)=>{
    const token= JSON.parse(localStorage.getItem("user")).token
     try {
        if (!id) {
            dispatch({
                type:"SELECT_CHAT",
                payload:null
            })
            return
        }
        dispatch({type:"CHAT_REQUEST"})
        const {data} = await axios.get(`${baseUrl}/api/v1/chat/${id}`,{headers :{
            Authorization:`Bearer ${token}`
        }});
        dispatch({type:"SELECT_CHAT",payload:data})
    } catch(error) {
        console.log(error,"i am");
        dispatch({
            type:"CHAT_FAIL",
            payload:error
        })
    }
}

export const getStream = (stream)=>(dispatch)=>{
    dispatch({type:"GET_STREAM",payload:stream})
}

export const endStream = ()=>(dispatch)=>{
    dispatch({type:"END_STREAM"})
}