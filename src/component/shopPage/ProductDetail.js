import axios from "axios"
import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addCartList, removeProduct, selectProduct } from "../../redux/actions"
import classes from './ProductDetail.module.css'
import ProductReviews from "./ProductReviews"


const ProductDetail=()=>{
    const params = useParams()
    const [isLoading,setIsLoading] = useState(true)
    const [count,setCount] = useState(1)
    const dispatch= useDispatch()
    const productDetail = useSelector((state)=> state.productDetail)
    const {image, title,price,description,category} = productDetail
    const product = {image,title,price,count,category,productId:params.productId}
    console.log(productDetail);
    useEffect(()=>{
        setIsLoading(true)
        axios.get(`https://fakestoreapi.com/products/${params.productId}`)
        .then(({data}) => {
            setIsLoading(false)
            dispatch(selectProduct(data))
        })
        return ()=>{
            dispatch(removeProduct())
        }
    },[params.productId])

    const addCartHandler =  (product)=>{
        product.id =  nanoid()
        dispatch(addCartList(product))
    }

    if(isLoading){
        return (
            <>
                <h2 style={{marginTop:'30px'}}>Loading....</h2>
            </>
        )
    }
    if(Object.keys(productDetail).length===0){
        return (
            <>
                <h2 style={{marginTop:'30px'}}>Sorry! No any product here....</h2>
            </>
        )
    }
    return (
        <section className={classes.productmain}>
            <div className={classes.product}>
                <div className={classes.image}>
                    <img src={image} alt={title}></img>
                </div>
                <div className={classes.content}>
                    <div className={classes.category}>
                        {category}
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
            <ProductReviews />
        </section>
        
    )
}
export default ProductDetail