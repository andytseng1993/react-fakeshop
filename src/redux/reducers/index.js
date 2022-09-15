import { combineReducers } from "redux";
import { productReducer, selectProducer ,selectCategoryReducer, openLogInBoxReducer,setUserNameReducer, setCartListReducer, setFavoriteReducer} from "./ProductReducer";

export const reducers = combineReducers({
    allProducts: productReducer,
    productDetail: selectProducer,
    selectCategory:selectCategoryReducer,
    openLogInbox: openLogInBoxReducer,
    setUserName:setUserNameReducer,
    setCartList:setCartListReducer,
    favorites: setFavoriteReducer
})