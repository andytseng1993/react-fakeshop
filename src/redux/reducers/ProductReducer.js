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
    let products=[]
    switch(action.type){
        case ACTIONS.UPDATE_CARTLIST:
            return [...action.payload]
        case ACTIONS.ADD_CARTLIST:
            if(state.find((item)=>item.productId===action.payload.productId)){
                products =state.map((item)=>
                item.productId===action.payload.productId?
                    {...item,count:item.count+action.payload.count}:item
                )
            }else{
                products = [...state,action.payload]
            }
            localStorage.setItem('cartItems', JSON.stringify(products))
            return products
        case ACTIONS.DELETE_CARTPRODUCT:
            products = state.filter((item)=> item.productId!==action.payload)
            localStorage.setItem('cartItems', JSON.stringify(products))
            return products
        case ACTIONS.DELETE_ALL_CARTPRODUCT:
            localStorage.removeItem('cartItems')
            return []
        case ACTIONS.INCREASE_QUANTITY:
            products = state.map((item) => 
                item.productId===action.payload?
                    {...item,count:item.count+1}:item
            )
            localStorage.setItem('cartItems', JSON.stringify(products))
            return products
        case ACTIONS.DECREASE_QUANTITY:
            const changeProduct = state.find((item)=> item.productId === action.payload) 
            if(changeProduct.count>1){
                products =  state.map((item) =>
                     item.productId===action.payload?
                    {...item,count:item.count-1}:item
                )

            }else{
                products = state.filter(item => 
                    item.productId!==action.payload
            )}
            localStorage.setItem('cartItems', JSON.stringify(products))
            return products
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
export const setUpLoadImageReducer = (state=false,action)=>{
    switch(action.type){
        case ACTIONS.UPLOAD_NEW_IMAGE:
            return !state
        default: 
            return state
    }
}
export const addToBagReducer = (state=[],action)=>{
    switch(action.type){
        case ACTIONS.ADD_CARTLIST:
            return [action.payload.productId]
        case ACTIONS.DELETE_To_BAG:
            return []
        default: 
            return state
    }
}