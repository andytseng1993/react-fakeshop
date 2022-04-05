import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { removeProduct, selectProduct } from "../../redux/actions"
import { useAxios } from "./ProductListing"


const ProductDetail=()=>{
    const params = useParams()
    const [isLoading,setIsLoading] = useState(true)
    const data = useAxios(`https://fakestoreapi.com/products/${params.productId}`)
    const dispatch= useDispatch()
    const productDetail = useSelector((state)=> state.productDetail)

    useEffect(()=>{
        setIsLoading(true)
        data.then(data => {
            setIsLoading(false)
            dispatch(selectProduct(data))
        })
        return ()=>{
            dispatch(removeProduct())
        }
    },[params.productId])

    if(isLoading){
        return (
            <>
                <h2>Loading....</h2>
            </>
        )
    }
    return (
        <div>
            <div>
                <div>
                    {productDetail.title}
                </div>
            </div>
        </div>
    )
}
export default ProductDetail