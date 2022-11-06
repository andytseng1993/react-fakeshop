import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import classes from './ProductComponent.module.css'
import FavoriteBtn from '../favorite/FavoriteBtn';
import Rating from '../reviews/Rating';
import { useUserData } from '../../context/UserDataContext';
import { useQuery } from '@tanstack/react-query';


const ProductComponent=({product,favoriteList})=>{
    const {id,title,image,price,category} = product
    const {readUserData}= useUserData()
    const { data:ratingObj } = useQuery({queryKey:['productRating', id], queryFn: async()=>{
        const response = await readUserData('productRating/'+ id)
        const value = response.val()
        if(value===null) return ({rating:0,reviewCount:0})
        return value
    },initialData:() =>({rating:0,reviewCount:0}),refetchOnWindowFocus:false})

    return(
        <div className={classes.container}>
                <div className={classes.cards}>
                    <Link to={`/product/${id}`}>
                        <div className={classes.image}>
                            <img src={image} alt={title}></img>
                        </div>
                    </Link>    
                    <div className={classes.content}>
                        <div className={classes.header}>
                            <Link to={`/product/${id}`}>
                                {title}
                            </Link> 
                        </div>
                        <div className={classes.rating}>
                            <Link to={`/product/${id}`}>
                                {ratingObj.rating>0? <Rating rating={ratingObj.rating} reviewsNum={ratingObj.reviewCount} fontSize={15}/>:null}
                            </Link> 
                        </div>
                        <div className={classes.productInfo}>
                            <div className={classes.priceAndCategory}>
                                <div className={classes.price}>$ {price}</div>
                                <div className={classes.category}>{category}</div>  
                            </div>
                            <FavoriteBtn productId={id} favoriteList={favoriteList} />
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ProductComponent