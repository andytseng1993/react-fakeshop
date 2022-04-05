import { combineReducers } from "redux";
import { productReducer, selectProducer } from "./ProductReducer";

export const reducers = combineReducers({
    allProducts: productReducer,
    productDetail: selectProducer
})