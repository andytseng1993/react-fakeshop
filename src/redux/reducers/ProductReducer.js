import { ACTIONS } from "../actions/action-type"

const intialState={
    products:[]
}

export const productReducer=(state=intialState,action)=>{
    switch(action.type){
        case ACTIONS.SET_PRODUCTS:
            return state
        case ACTIONS.SELECTED_PRODUCT:
            return state
        case ACTIONS.REMOVE_PRODUCT:
            return state
        default:
            return state
    }
}