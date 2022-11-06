import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux"
import { setProducts,setFavoriteList } from "../../redux/actions";
import { useUserData } from "../../context/UserDataContext";
import ProductCategory from "./ProductCategory";
import ProductComponent from "./ProductComponent";
import { useQuery } from "@tanstack/react-query";

const ProductListing=({currentUser})=>{
    const dispatch = useDispatch()
    const productCategory = useSelector((state)=>state.selectCategory)
    const allProducts = useSelector((state)=>state.allProducts.products)
    const favoriteList = useSelector((state)=>state.favorites)
    const {readUserData} = useUserData()
    const [filterProducts,setFilterProducts] = useState([])
    const {isLoading,isError} = useQuery({ queryKey: ['products'], queryFn: ()=>{
        return axios.get('https://fakestoreapi.com/products')
            .then(({data})=>{
                dispatch(setProducts(data))
                return data
            })
    },refetchOnWindowFocus:false,staleTime:120000,enabled:allProducts.length===0 })

    const {data} = useQuery({ queryKey: ['favorites'], queryFn: async ()=>{
        const response = await readUserData('users/'+currentUser.uid+'/favorites')
        const favorites =[]
        response.forEach(element => {
            favorites.push(parseInt(element.key))
        })
        favorites.length ===0?dispatch(setFavoriteList([])):dispatch(setFavoriteList(favorites))
        return response
    },refetchOnWindowFocus:false,enabled:!!currentUser })
    
    useEffect(()=>{
        if(currentUser==='') return
        if(currentUser===null){
            dispatch(setFavoriteList([]))
        }
    },[currentUser])

    useEffect(()=>{
        if(productCategory=== 'All Products'){
            setFilterProducts(allProducts)
            return
        }
        if(productCategory!== ''){
            setFilterProducts(allProducts.filter(({category})=> category===productCategory))
        }
    },[productCategory,allProducts])
    
    

    if(isLoading){
        return (
            <div className='productList'>
                 <h3>Loading...</h3>
            </div>
        )
     }
     if(isError){
        return (
            <div className='productList'>
                 <h3>Sometihing was wrong...</h3>
            </div>
        )
     }
    return (
        <>
            <nav className='category'>
                <ProductCategory/>
            </nav>
            <div className='productList'>
                {filterProducts.map((product)=>(
                    <ProductComponent key={product.id} product={product} favoriteList={favoriteList}/>
                ))}
                <span className="wrap" />
                <span className="wrap" />
                <span className="wrap" />
                <span className="wrap" />
            </div>
        </>
    )
}
export default ProductListing