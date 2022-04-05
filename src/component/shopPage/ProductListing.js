import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../../redux/actions";
import ProductComponent from "./ProductComponent";



const ProductListing=()=>{
    const products = useSelector((state)=>state.allProducts.products)
    const dispatch = useDispatch()

    useEffect(()=>{
        const axiosData = ()=>{
                return axios.get('https://fakestoreapi.com/products')
             .then((res) => {
                return res.data
            })
            .catch(err=>console.error(err))
        }
        axiosData().then((data)=>{
            dispatch(setProducts(data))
        })
      },[])
      console.log(products);
    return (
        <div>
             <ProductComponent/>
        </div>
    )
}
export default ProductListing