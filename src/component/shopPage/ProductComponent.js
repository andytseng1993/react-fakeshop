import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import classes from './ProductComponent.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as fasFaHeart} from "@fortawesome/free-solid-svg-icons";
import { useUserAuth } from '../../context/UserAuthContext';
import { useUserData } from '../../context/UserDataContext'
import { useDispatch } from 'react-redux'
import { addFavoriteList, deleteFavoriteList } from "../../redux/actions";


const ProductComponent=({productCategory,allProducts,favoriteList})=>{
    const dispatch = useDispatch()
    const { currentUser } = useUserAuth()
    const { writeUserData } = useUserData()
    const [products,setProducts] = useState([])
   
    useEffect(()=>{
        if(productCategory!== ''){
            setProducts(allProducts.filter(({category})=> category===productCategory))
        }
        if(productCategory=== 'All Products'){
            setProducts(allProducts)
        }
    },[productCategory])

    const favorites= (productId) =>{
        if(!favoriteList) return
        return favoriteList.includes(productId)
    }
    
    const handleAddFavorite = (productId)=>{
        dispatch(addFavoriteList(productId))
        writeUserData(`users/${currentUser.uid}/favorites/${productId}`,true) 
    }
    
    const handleRemoveFavorite = (productId)=>{
        dispatch(deleteFavoriteList(productId))
        writeUserData(`users/${currentUser.uid}/favorites/${productId}`,{})

    }
    const renderList = products.map((product)=>{
        const {id,title,image,price,category} = product
        return(
            <div className={classes.container} key={id}>
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
                            <div className={classes.productInfo}>
                                <div className={classes.priceAndCategory}>
                                    <div className={classes.price}>$ {price}</div>
                                    <div className={classes.category}>{category}</div>  
                                </div>

                                {favorites(id)?
                                    <FontAwesomeIcon className={classes.favoriteActived} icon={fasFaHeart} onClick={()=>handleRemoveFavorite(product.id)} />
                                    :
                                    <FontAwesomeIcon className={classes.favorite} icon={farFaHeart} onClick={()=>handleAddFavorite(product.id)} />
                                }
                            </div>
                        </div>
                    </div>
            </div>
        )
    })
    
    return (
        <>  
            {renderList}
        </>
    )
}

export default ProductComponent