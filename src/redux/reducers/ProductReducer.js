import { ACTIONS } from "../actions/action-type"

const intialState={
    products:[{
        id:1,
        title: 'Dispatch',
        category: 'program'
    }]
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