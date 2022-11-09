import axios from "axios"
import { nanoid } from "nanoid"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addCartList} from "../../redux/actions"
import classes from './ProductDetail.module.css'
import ProductReviews from "../reviews/ProductReviews"
import FavoriteBtn from '../favorite/FavoriteBtn'
import { useQuery } from "@tanstack/react-query"


export const fetchProductIdData = async (id)=>{
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
    return response.data
}

const ProductDetail=()=>{
    const {productId} = useParams()
    const [count,setCount] = useState(1)
    const dispatch= useDispatch()
    const favoriteList = useSelector((state)=>state.favorites)
    const {isLoading,isError, data:productDetail } = useQuery({ queryKey: ['products',productId], 
    queryFn: ()=>fetchProductIdData(productId),refetchOnWindowFocus: false })
    
    const addCartHandler =  (product)=>{
        product.id =  nanoid()
        dispatch(addCartList(product))
    }

    if(isLoading){
        return (<h2 style={{marginTop:'120px'}}>Loading...</h2>)
    }
    const {image, title,price,description,category,id} = productDetail
    const product = {...productDetail,count,productId:id}
    console.log(product);
    return (
        <section className={classes.productmain}>
            {
            isError? <h2 style={{marginTop:'120px'}}>Something was wrong...</h2>:
            Object.keys(productDetail).length===0?
            <h2 style={{marginTop:'120px'}}>Sorry! No any product here....</h2>:
                <>
                    <div className={classes.product}>
                        <div className={classes.image}>
                            <img src={image} alt={title}></img>
                        </div>
                        <div className={classes.content}>
                            <div className={classes.category}>
                                <div>
                                    {category}
                                </div>
                                <FavoriteBtn productId={parseInt(productId)} favoriteList={favoriteList} />
                            </div>
                            <div className={classes.title}>
                                {title}
                            </div>
                            <div className={classes.price}>
                                ${price}
                            </div>
                            <div className={classes.cartArea}>
                                <div className={classes.quantity}>
                                    <button onClick={()=>{setCount(prevCount=>prevCount>1?prevCount-1:prevCount)}}>-</button>
                                    <div className={classes.count}>{count}</div>
                                    <button onClick={()=>setCount(prevCount=>prevCount+1)}>+</button>
                                </div>
                                <div className={classes.cart} onClick={()=>addCartHandler(product)}>
                                    Add to Cart
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.productDetail}>
                        <h1 className={classes.productArea}>About this item</h1>
                        <hr/>
                        <div className={classes.description}>
                            <h3>Product details</h3>
                            <p style={{margin:'20px 0px'}}>
                                {description}
                            </p>
                        </div>
                    </div>
                    <ProductReviews productId={productId} />
                </>
            }
        </section>
        
    )
}
export default ProductDetail