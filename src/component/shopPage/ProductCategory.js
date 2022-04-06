import { useDispatch, useSelector } from "react-redux"

const ProductCategory=()=>{
    const dispatch=useDispatch()
    const select = useSelector((state)=> state.selectCategory)
    const products = useSelector((state)=> state.allProducts.products)
    let map={}
    let sort=[]
    products.forEach(({category})=>{
        if(!map[category]){
            map[category] = 1
            sort.push(category)
            sort.sort()
        }
    })
    console.log(sort);
    return(
        <>
            <select name="cars" id="cars" >
                <option value="All Products">All Products</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
            </select>
        </>
    )
}

export default ProductCategory