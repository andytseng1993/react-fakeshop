import { ACTIONS } from "./action-type";

export const setProducts=(products)=>{
    return {
        type: ACTIONS.SET_PRODUCTS,
        payload: products
    }
}
export const selectProduct=(product)=>{
    return {
        type: ACTIONS.SELECTED_PRODUCT,
        payload: product
    }
}
export const removeProduct=()=>{
    return {
        type: ACTIONS.REMOVE_PRODUCT,
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
export const editCartProductQuantity = (email,productName,quantity)=>{
    return {
        type:ACTIONS.EDIT_CARTQUANTITY,
        payload:{
            email,
            productName,
            quantity
        }
    }
}
