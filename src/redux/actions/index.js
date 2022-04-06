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
export const removeProduct=(product)=>{
    return {
        type: ACTIONS.REMOVE_PRODUCT,
        payload: product
    }
}

export const setProductCategory=(product)=>{
    return {
        type: ACTIONS.SET_CATEGORY,
        payload: product
    }
}
