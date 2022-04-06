import { ACTIONS } from "../actions/action-type"

const intialState={
    products:[]
}

export const productReducer=(state=intialState,action)=>{
    switch(action.type){
        case ACTIONS.SET_PRODUCTS:
            return {...state, products:action.payload}
        default:
            return state
    }
}

export const selectProducer =(state={},action)=>{
    switch(action.type){
        case ACTIONS.SELECTED_PRODUCT:
            return {...state,...action.payload}
        case ACTIONS.REMOVE_PRODUCT:
            return {}
        default:
            return state
    }
}
export const selectCategoryReducer=(state='All Products',action)=>{
    switch(action.type){
        case ACTIONS.SET_CATEGORY:
            return action.payload
        default:
            return state
    }
}