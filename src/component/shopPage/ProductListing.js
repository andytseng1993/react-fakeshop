import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../../redux/actions";
import ProductComponent from "./ProductComponent";



const ProductListing=()=>{
    const products = useSelector((state)=>state.allProducts.products)
    const dispatch = useDispatch()
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        setIsLoading(true)
        const axiosData = ()=>{
                return axios.get('https://fakestoreapi.com/products')
             .then((res) => {
                return res.data
            })
            .catch(err=>console.error(err))
        }
        axiosData().then((data)=>{
            dispatch(setProducts(data))
            setIsLoading(false)
        })
      },[])
      console.log(products);

     if(isLoading){
        return (
            <div className='productList'>
                 <h3>Loading...</h3>
            </div>
        )
     }
    return (
        <div className='productList'>
             <ProductComponent/>
             <span className="wrap" />
        </div>
    )
}
export default ProductListing