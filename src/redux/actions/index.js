import { ACTIONS } from "./action-type";

export const setProducts=(products)=>{
    return {
        type: ACTIONS.SET_PRODUCTS,
        payload: products
    }
}

export const setProductCategory=(product)=>{
    return {
        type: ACTIONS.SET_CATEGORY,
        payload: product
    }
}

export const setLogInBox = (isActive)=>{
    return{
        type:ACTIONS.SET_LOGINBOX,
        payload: isActive
    }
}
export const setRegisterBox = (isActive)=>{
    return{
        type:ACTIONS.SET_REGISTER,
        payload: isActive
    }
}

export const setUserName = (name)=>{
    return{
        type:ACTIONS.SET_USERNAME,
        payload: name
    }
}

export const updateCartList = (products)=>{
    return {
        type:ACTIONS.UPDATE_CARTLIST,
        payload:products
    }
}

export const addCartList = (product)=>{
    return {
        type:ACTIONS.ADD_CARTLIST,
        payload:product
    }
}
export const deleteCartProduct = (id)=>{
    return {
        type:ACTIONS.DELETE_CARTPRODUCT,
        payload:id
    }
}
export const increaseQuantity = (productId)=>{
    return {
        type:ACTIONS.INCREASE_QUANTITY,
        payload: productId
    }
}
export const decreaseQuantity = (productId)=>{
    return {
        type:ACTIONS.DECREASE_QUANTITY,
        payload: productId
    }
}

export const setFavoriteList =(favorites)=>{
    return{
        type: ACTIONS.SET_FAVORITE,
        payload: favorites
    }
}
export const addFavoriteList =(productId)=>{
    return{
        type: ACTIONS.ADD_FAVORITE,
        payload: productId
    }
}
export const deleteFavoriteList =(productId)=>{
    return{
        type: ACTIONS.DELETE_FAVORITE,
        payload: productId
    }
}