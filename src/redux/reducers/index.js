import { combineReducers } from "redux";
import { productReducer, selectProducer ,selectCategoryReducer, openLogInBoxReducer} from "./ProductReducer";

export const reducers = combineReducers({
    allProducts: productReducer,
    productDetail: selectProducer,
    selectCategory:selectCategoryReducer,
    openLogInbox: openLogInBoxReducer
})