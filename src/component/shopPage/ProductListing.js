import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux"
import { setProducts } from "../../redux/actions";
import ProductCategory from "./ProductCategory";
import ProductComponent from "./ProductComponent";

const ProductListing=()=>{
    const dispatch = useDispatch()
    const [isLoading,setIsLoading] = useState(true)
    const productCategory = useSelector((state)=>state.selectCategory)
    const allProducts = useSelector((state)=>state.allProducts.products)
    
    useEffect(()=>{
        setIsLoading(true)
        axios.get('https://fakestoreapi.com/products')
        .then(({data})=>{
            dispatch(setProducts(data))
            setIsLoading(false)
        })
      },[])

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
                <ProductComponent productCategory={productCategory} allProducts={allProducts} />
                <span className="wrap" />
                <span className="wrap" />
                <span className="wrap" />
                <span className="wrap" />
            </div>
        </>
    )
}
export default ProductListing