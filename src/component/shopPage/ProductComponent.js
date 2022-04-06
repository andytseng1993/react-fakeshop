import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import classes from './ProductComponent.module.css'

const ProductComponent=()=>{
    const [productCategory,setProductCategory] = useState('')
    const allProducts = useSelector((state)=>state.allProducts.products)
    let products
    if(productCategory!== ''){
        products= allProducts.filter(({category})=> category===productCategory)
    }
    if(productCategory=== ''){
        products= allProducts
    }
    const renderList = products.map((product)=>{
        const {id,title,image,price,category} = product
        return(
            <div className={classes.container} key={id}>
                <Link to={`/product/${id}`}>
                    <div className={classes.cards}>
                        <div className={classes.image}>
                            <img src={image} alt={title}></img>
                        </div>
                        <div className={classes.content}>
                            <div className={classes.header}>{title}</div>
                            <div className={classes.price}>$ {price}</div>
                            <div className={classes.category}>{category}</div>
                        </div>
                    </div>
                </Link>
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