import { useQuery } from "@tanstack/react-query"
import { fetchProductIdData } from "../component/shopPage/ProductDetail"
import { useUserData } from "../context/UserDataContext"

export const  useFetchProductIdData = (productId) =>useQuery({ queryKey: ['products',productId], 
    queryFn: ()=>fetchProductIdData(productId),refetchOnWindowFocus: false })

export const useFetchProductRating = (productId)=>{
    const {readUserData} = useUserData()

    const fetchProductRating = async(productId) => {
        const response = await readUserData('productRating/'+ productId)
        const value = response.val()
        if(value===null) return ({rating:0,reviewCount:0})
        return value
    }    
    return useQuery({queryKey:['productRating', productId], 
    queryFn: ()=>fetchProductRating(productId) ,initialData:() =>({rating:0,reviewCount:0})})
}