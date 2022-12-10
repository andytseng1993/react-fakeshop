import { useQuery } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import { useUserAuth } from "../context/UserAuthContext"
import { useUserData } from "../context/UserDataContext"
import { setFavoriteList } from "../redux/actions"

export const useFetchFavoriteList = ()=>{
    const dispatch = useDispatch()
    const {currentUser}=useUserAuth()
    const {readUserData} = useUserData()
    const favoriteList = useSelector((state)=>state.favorites)
    
    const fetchFavoriteArray= async () =>{
        const response = await readUserData('users/'+currentUser.uid+'/favorites')
        let favorites =[]
        response.forEach(element => {
            favorites.push(parseInt(element.key))
        })
        favorites.length ===0?dispatch(setFavoriteList([])):dispatch(setFavoriteList(favorites))
        return response
    }
    return useQuery({ queryKey: ['favorites'], queryFn: fetchFavoriteArray,
    refetchOnWindowFocus:false,enabled: (favoriteList.length===0?true:false)&&!!currentUser })
}