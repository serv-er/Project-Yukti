import { createSlice } from "@reduxjs/toolkit";
import axios  from "axios"; 



const userSlice=createSlice({
    name:"user",
    initialState:{
        loading:false,
        error:null,
        isAuthenticated:false,
        message:null,
        user:null,
    },
    reducers:{
        registerRequest(state,action){
         state.loading=true,
         state.error=null,
         state.isAuthenticated=false,
         state.message=null,
         state.user={}
        },
        registerSuccess(state,action){
          state.loading=false,
          state.error=null,
          state.isAuthenticated=true,
          state.message=action.payload.message,
          state.user=action.payload.user
        },
        registerFailed(state,action){
            state.loading=false,
            state.error=action.payload,
            state.isAuthenticated=false,
            state.message=action.payload.message,
            state.user={}
        },
        loginRequest(state,action){
           state.loading=true,
           state.error=null,
           state.isAuthenticated=false,
           state.message=null,
           state.user={}
        },
        loginSuccess(state,action){
            state.loading=false,
            state.error=null,
            state.isAuthenticated=true,
            state.message=action.payload.message,
            state.user=action.payload.user
        },
        loginFailed(state,action){
         state.loading=false,
         state.error=action.payload,
         state.isAuthenticated=false,
         state.message=action.payload.message,
         state.user={}
        },
        clearAllErrors(state,action){
            state.error=null,
            state.user=state.user;
        }

    }
})


export const register=(data)=>async(dispatch)=>{
          dispatch(userSlice.actions.registerRequest());
          try{
            const response=await axios.post("http://localhost:7000/api/v1/register",data,{
                headers:{
                
                    "Content-type":"application/json"
                },
                withCredentials:true
            });
            dispatch(userSlice.actions.registerSuccess(response.data));
            dispatch(userSlice.actions.clearAllErrors()); 
        }catch(error){
            dispatch(userSlice.actions.registerFailed(error.response.data.message));
          }
}
export const login=(data)=>async(dispatch)=>{
    console.log(data);
     dispatch(userSlice.actions.loginRequest());
     try{
        const response=await axios.post("http://localhost:7000/api/v1/user/login",data,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch(userSlice.actions.loginSuccess(response.data));
        dispatch(userSlice.actions.clearAllErrors());
     }
     catch(error){
        dispatch(userSlice.actions.loginFailed(error.response.message));
     }
}
export const clearAllUserErrors=()=>(dispatch)=>{
    dispatch(userSlice.actions.clearAllErrors())
}
export default userSlice.reducer