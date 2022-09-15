import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux"
import { setProducts,setFavoriteList } from "../../redux/actions";
import { useUserAuth } from "../../context/UserAuthContext";
import { useUserData } from "../../context/UserDataContext";
import ProductCategory from "./ProductCategory";
import ProductComponent from "./ProductComponent";

const ProductListing=()=>{
    const dispatch = useDispatch()
    const [isLoading,setIsLoading] = useState(false)
    const productCategory = useSelector((state)=>state.selectCategory)
    const allProducts = useSelector((state)=>state.allProducts.products)
    const favoriteList = useSelector((state)=>state.favorites)
    const {currentUser}  = useUserAuth()
    const {readUserData} = useUserData()

    
    useEffect(()=>{
        if(allProducts.length===0){
        setIsLoading(true)
        axios.get('https://fakestoreapi.com/products')
        .then(({data})=>{
            dispatch(setProducts(data))
            setIsLoading(false)
        })}
    },[dispatch,allProducts])

    useEffect(()=>{
        if(!currentUser){
            dispatch(setFavoriteList([]))
        }else{
            readUserData('users/'+currentUser.uid+'/favorites')
                .then(res=> {
                    const favorites =[]
                    res.forEach(element => {
                        favorites.push(parseInt(element.key))
                    })
                    favorites.length ===0?
                    dispatch(setFavoriteList([]))
                    :
                    dispatch(setFavoriteList(favorites))
                })
        }
    },[currentUser,dispatch,readUserData])

    if(isLoading){
        return (
            <div className='productList'>
                 <h3>Loading...</h3>
            </div>
        )
     }
    return (
        <>
            <nav className='category'>
                <ProductCategory/>
            </nav>
            <div className='productList'>
                <ProductComponent 
                    productCategory={productCategory} 
                    allProducts={allProducts} 
                    favoriteList={favoriteList}/>
                <span className="wrap" />
                <span className="wrap" />
                <span className="wrap" />
                <span className="wrap" />
            </div>
        </>
    )
}
export default ProductListing