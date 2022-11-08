import { useQuery } from "@tanstack/react-query"
import { ref , query, orderByChild, onValue} from "firebase/database";
import { useUserAuth } from "../../context/UserAuthContext";
import { database } from "../../firebase"

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
    const addressesData =[]
    data?.forEach((childSnapshot)=> {
        childSnapshot.val().default?
        addressesData.unshift(childSnapshot.val())
        :
        addressesData.push(childSnapshot.val())
    })
    return addressesData
},['data'])