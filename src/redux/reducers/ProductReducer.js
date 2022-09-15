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

export const openLogInBoxReducer = (state={logIn:false,register:false},action)=>{
    switch(action.type){
        case ACTIONS.SET_LOGINBOX:
            return {...state,logIn:action.payload}
            case ACTIONS.SET_REGISTER:
                return {...state,register:action.payload}
        default:
            return state
    }
}
export const setUserNameReducer=(state='',action)=>{
    switch(action.type){
        case ACTIONS.SET_USERNAME:
            return action.payload
        default:
            return state
    }
}

export const setCartListReducer=(state=[],action)=>{
    switch(action.type){
        case ACTIONS.UPDATE_CARTLIST:
            return [...state,action.payload]
        case ACTIONS.ADD_CARTLIST:
            if(state.find((item)=>item.productId===action.payload.productId)){
                return state.map((item)=>
                item.productId===action.payload.productId?
                    {...item,count:item.count+action.payload.count}:item
                )
            }
            return [...state,action.payload]
        case ACTIONS.DELETE_CARTPRODUCT:
            return state.filter((item)=> item.productId!==action.payload)
        case ACTIONS.INCREASE_QUANTITY:
            return state.map((item) => 
                item.productId===action.payload?
                    {...item,count:item.count+1}:item
            )
        case ACTIONS.DECREASE_QUANTITY:
            const changeProduct = state.find((item)=> item.productId === action.payload)
            if(changeProduct.count>1){
                return state.map((item) =>
                     item.productId===action.payload?
                    {...item,count:item.count-1}:item
                )}else{
                return state.filter(item => 
                    item.productId!==action.payload
                )}
        default: 
            return state
    }
}

export const setFavoriteReducer =(state=[],action)=>{
    switch(action.type){
        case ACTIONS.SET_FAVORITE:
            return action.payload
        case ACTIONS.ADD_FAVORITE:
            return [...state,action.payload]
        case ACTIONS.DELETE_FAVORITE:
            return state.filter(product=>product !== action.payload)
        default: 
            return state
    }
}