import { useQuery } from "@tanstack/react-query"
import { onValue, orderByChild, query, ref } from "firebase/database"
import { useUserAuth } from "../context/UserAuthContext"
import { database } from "../firebase"


export const useAddressQuery = (select,notifyOnChangeProps) =>{
    const { currentUser }  = useUserAuth() 
    const fetchData = ()=>{
        const topAddressesRef = query(ref(database, 'users/'+currentUser.uid+'/addresses'), orderByChild('createTime'))
        return new Promise(resolve =>
            onValue(topAddressesRef, (snapshot) => {
                resolve(snapshot)
            },
            {onlyOnce: true}
        ))
    }
    return useQuery({queryKey:["addresses"],queryFn:fetchData,refetchOnWindowFocus:false, select, notifyOnChangeProps})
}
export const useAddressData = () => useAddressQuery((data) =>{
    const preferrAddress = []
    const addressesData =[]
    data?.forEach((childSnapshot)=> {
        childSnapshot.val().default?
        preferrAddress.push(childSnapshot.val())
        :
        addressesData.unshift(childSnapshot.val())
    })
    const Alladdress =  preferrAddress.concat(addressesData)
    return Alladdress
},['data'])