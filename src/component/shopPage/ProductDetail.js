import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectProduct } from "../../redux/actions"
import { useAxios } from "./ProductListing"


const ProductDetail=()=>{
    const params = useParams()
    const [isLoading,setIsLoading] = useState(true)
    const data = useAxios(`https://fakestoreapi.com/products/${params.productId}`)
    const dispatch= useDispatch()
    const productDetail = useSelector((state)=> state.productDetail)
    console.log(productDetail);

    useEffect(()=>{
        setIsLoading(true)
        data.then(data => {
            setIsLoading(false)
            dispatch(selectProduct(data))
        })
    },[params.productId])

    if(isLoading){
        return (
            <>
                <h1>ProductDetail</h1>
                <h2>Loading....</h2>
            </>
        )
    }
    return (
        <h1>ProductDetail</h1>
    )
}
export default ProductDetail