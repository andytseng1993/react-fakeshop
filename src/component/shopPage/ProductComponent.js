import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import classes from './ProductComponent.module.css'
import FavoriteBtn from '../favorite/FavoriteBtn';

const ProductComponent=({productCategory,allProducts,favoriteList})=>{
    const [products,setProducts] = useState([])
    
    useEffect(()=>{
        if(productCategory!== ''){
            setProducts(allProducts.filter(({category})=> category===productCategory))
        }
        if(productCategory=== 'All Products'){
            setProducts(allProducts)
        }
    },[productCategory,allProducts])

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
                                <FavoriteBtn productId={id} favoriteList={favoriteList} />
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