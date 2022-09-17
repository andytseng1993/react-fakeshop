import { combineReducers } from "redux";
import { productReducer,
         selectCategoryReducer, 
         openLogInBoxReducer,
         setUserNameReducer, 
         setCartListReducer, 
         setFavoriteReducer} from "./ProductReducer";

export const reducers = combineReducers({
    allProducts: productReducer,
    selectCategory:selectCategoryReducer,
    openLogInbox: openLogInBoxReducer,
    setUserName:setUserNameReducer,
    setCartList:setCartListReducer,
    favorites: setFavoriteReducer
})