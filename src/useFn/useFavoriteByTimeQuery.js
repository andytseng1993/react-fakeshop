import { useQuery } from "@tanstack/react-query"
import { limitToLast, onValue, orderByValue, query, ref } from "firebase/database"
import { useUserAuth } from "../context/UserAuthContext"
import { database } from "../firebase"

export const useFavoriteByTimeQuery =(select,notifyOnChangeProps)=>{
    const {currentUser}=useUserAuth()

    const fetchData = ()=>{
        const favoriteRef = query(ref(database, 'users/'+currentUser.uid+'/favorites'), orderByValue('createTime'),limitToLast(3))
        return new Promise(resolve =>
            onValue(favoriteRef, (snapshot) => {
                resolve(snapshot)
            },
            {onlyOnce: true}
        ))
    }
    return useQuery({ queryKey: ['favorites'], queryFn: fetchData,
    refetchOnWindowFocus:false,notifyOnChangeProps,select })
}
export const useFavoriteByTimeSelect = () => useFavoriteByTimeQuery((data)=>{
    let favorites =[]
    data.forEach(element => {
        favorites.push(parseInt(element.key))
    })
    return favorites.reverse()
},['data'])