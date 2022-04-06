import { useDispatch, useSelector } from "react-redux"

const ProductCategory=()=>{
    const dispatch=useDispatch()
    const select = useSelector((state)=> state.selectCategory)
    const products = useSelector((state)=> state.allProducts.products)

    function allCategories (products){
       let map={}
        let sort=[]
        products.forEach(({category})=>{
            if(!map[category]){
                map[category] = 1
                sort.push(category)
                sort.sort()
            }
        })
        return sort 
    }
    const categoryArray = allCategories(products)

    return(
        <>
            {
                categoryArray.map((category)=>(
                    <button 
                        key={category} 
                        onClick={()=> console.log(category)}
                    >
                        {category}
                    </button>
                ))
            }
        </>
    )
}

export default ProductCategory