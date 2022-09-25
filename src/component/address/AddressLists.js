import { useEffect } from "react"
import { useUserAuth } from "../../context/UserAuthContext"
import { useUserData } from "../../context/UserDataContext"

const AddressList = ()=>{
    const { readUserData } = useUserData()
    const {currentUser}  = useUserAuth()
    useEffect(()=>{
        const addresses =[]
        let isCancel = false
        readUserData('users/'+currentUser.uid+'/addresses')
        .then(res=>{
            if(!isCancel){
                for(let key in res){
                    const review={...res[key]}
                    addresses.push(review)
                }
            }
        })
        return ()=>{
            isCancel = true 
        }
    },[])

}
export default AddressList