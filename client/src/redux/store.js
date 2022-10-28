import cartReducer from "./cartRedux";
import {configureStore} from "@reduxjs/toolkit"
export default configureStore({
    reducer:{
        cart: cartReducer
    }
})
