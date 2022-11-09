import { Link } from 'react-router-dom'
import classes from './FavoriteItem.module.css'
import { addCartList} from "../../redux/actions"
import FavoriteBtn  from '../favorite/FavoriteBtn';
import Rating from '../reviews/Rating';
import { useUserData } from '../../context/UserDataContext';
import { useQuery } from '@tanstack/react-query';
import { fetchProductIdData } from '../shopPage/ProductDetail';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck} from "@fortawesome/free-solid-svg-icons";


const FavoriteItem=({productId,favoriteList})=>{
    const dispatch = useDispatch()
    const {readUserData}= useUserData()
    const [addCart,setAddCart] =useState(false)
    const {isLoading, data:productDetail } = useQuery({ queryKey: ['products',productId], 
        queryFn: ()=>fetchProductIdData(productId),refetchOnWindowFocus: false })
    const { data:ratingObj,isLoading:ratingIsLoading } = useQuery({queryKey:['productRating', productId], queryFn: async()=>{
        const response = await readUserData('productRating/'+ productId)
        const value = response.val()
        if(value===null) return ({rating:0,reviewCount:0})
        return value
    },initialData:() =>({rating:0,reviewCount:0}),refetchOnWindowFocus:false})
    
    const addCartHandler =  (product)=>{
        product.id =  nanoid()
        dispatch(addCartList(product))
        setTimeout(()=>setAddCart(true),500)
    }
    if(isLoading||ratingIsLoading) return ( <></> )
    const product = {...productDetail,count: 1,productId}
    return(
        <div className={classes.container}>
            <div className={classes.cards}>
                <Link to={`/product/${productId}`} className={classes.imageLink}>
                    <img src={productDetail.image} alt={productDetail.title}></img>
                </Link>    
                <div className={classes.content}>
                    <div className={classes.header}>
                        <Link to={`/product/${productId}`}>
                            {productDetail.title}
                        </Link> 
                    </div>
                    <div className={classes.rating}>
                        <Link to={`/product/${productId}`}>
                            {ratingObj.rating>0? <Rating rating={ratingObj.rating} reviewsNum={ratingObj.reviewCount} fontSize={15}/>:null}
                        </Link> 
                    </div>
                    <div className={classes.productInfo}>
                        <div className={classes.priceAndCategory}>
                            <div className={classes.price}>$ {productDetail.price}</div>
                            <div className={classes.category}>{productDetail.category}</div>  
                        </div>
                        <FavoriteBtn productId={productId} favoriteList={favoriteList} />    
                    </div>
                    {!addCart?
                        <div className={classes.cart} onClick={()=>addCartHandler(product)}>
                            Add to Cart
                        </div>
                        :
                        <div className={classes.addCart}>
                            <div className={classes.checkContent}>
                                <FontAwesomeIcon icon={faCircleCheck} className={classes.check}/>
                                <p>Added to Cart</p>
                            </div>
                            <Link to={'/cart'} className={classes.viewCart}>View your Cart</Link>     
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default FavoriteItem