import axios from "axios"
const baseUrl = import.meta.env.VITE_BASE_URL
export const searchUser = (keyword)=>async(dispatch)=>{
    try{
        dispatch({type:"ALL_USERS_REQUEST"})
        const {token} = JSON.parse(localStorage.getItem("user"))
        const {data} = await axios.get(`${baseUrl}/api/v1/auth/`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
            params:{
                search:keyword
            }
        })
        dispatch({type:"ALL_USERS_SUCCESS",payload:data.users})
    }catch(err){
        dispatch({
            type:"ALL_USERS_FAIL",
            payload:err
        })
    } 
}

export const clearErrors = ()=>async(dispatch)=>{
    dispatch({type:"CLEAR_ERROR"})
}

