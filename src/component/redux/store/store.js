import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import productReducer from "../reducer/reducer";


const rootReducer = combineReducers({
    products: productReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store