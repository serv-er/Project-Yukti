import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import opportunityReducer from "./slices/opportunityslice"

console.log(userReducer)
const store =configureStore({
    reducer:{
        opportunities:opportunityReducer,
        user:userReducer,
    }
});

export default store