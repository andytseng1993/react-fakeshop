import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux"
import { setProducts,setFavoriteList } from "../../redux/actions";
import ProductCategory from "./ProductCategory";
import ProductComponent from "./ProductComponent";
import { useQuery } from "@tanstack/react-query";
import { useFetchFavoriteList } from "../../useFn/UseFetchFavoriteList";

const ProductListing=({currentUser})=>{
    const dispatch = useDispatch()
    const productCategory = useSelector((state)=>state.selectCategory)
    const allProducts = useSelector((state)=>state.allProducts.products)
    const favoriteList = useSelector((state)=>state.favorites)
    const [filterProducts,setFilterProducts] = useState([])
    // eslint-disable-next-line
    const {isLoading,isError} = useQuery({ queryKey: ['products'], queryFn: ()=>{
        return axios.get('https://fakestoreapi.com/products')
            .then(({data})=>{
                dispatch(setProducts(data))
                return data
            })
    },refetchOnWindowFocus:false,enabled:allProducts.length===0 })
    
    // eslint-disable-next-line
    const {data} = useFetchFavoriteList()

    useEffect(()=>{
        if(currentUser==='') return
        if(currentUser===null){
            dispatch(setFavoriteList([]))
        }
    },[currentUser,dispatch])

    useEffect(()=>{
        if(productCategory=== 'All Products'){
            setFilterProducts(allProducts)
            return
        }
        if(productCategory!== ''){
            setFilterProducts(allProducts.filter(({category})=> category===productCategory))
        }
    },[productCategory,allProducts])
    
    return (
        <>
            {
            isError?(
            <div className='productList'>
                <h3>Sometihing was wrong...</h3>
            </div>): 
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
            }
        </>
    )
}
export default ProductListing