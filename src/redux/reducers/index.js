import { combineReducers } from "redux";
import { productReducer, selectProducer ,selectCategoryReducer, openLogInBoxReducer, setUserName, setCartList} from "./ProductReducer";

export const reducers = combineReducers({
    allProducts: productReducer,
    productDetail: selectProducer,
    selectCategory:selectCategoryReducer,
    openLogInbox: openLogInBoxReducer,
    setUserName:setUserName,
    setCartList:setCartList,
})