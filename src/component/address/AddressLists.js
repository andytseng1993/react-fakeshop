import { useEffect, useState } from "react"
import { NavLink, useNavigate} from "react-router-dom"
import { useUserAuth } from "../../context/UserAuthContext"
import { useUserData } from "../../context/UserDataContext"
import classes from './AddressLists.module.css'
import { ref , query, orderByChild, onValue} from "firebase/database";
import AddressBox from "./AddressBox"
import { database } from "../../firebase"
import { useQuery } from "@tanstack/react-query"

const AddressList = ()=>{
    const { writeUserData } = useUserData()
    const { currentUser }  = useUserAuth()
    const [addresses,setAddresses]= useState([])
    const navigate = useNavigate()

    const fetchData = ()=>{
        const topAddressesRef = query(ref(database, 'users/'+currentUser.uid+'/addresses'), orderByChild('createTime'))
        return new Promise(resolve =>
            onValue(topAddressesRef, (snapshot) => {
                resolve(snapshot)
            },
            {onlyOnce: true}
        ))
    }
    
    const {data:addressSnapshot,isLoading} = useQuery({queryKey:["addresses"],queryFn: fetchData,refetchOnWindowFocus:false})
    
    useEffect(() => {
        const addressesData =[]
        const Snapshot = ()=>{
            addressSnapshot?.forEach((childSnapshot)=> {
                childSnapshot.val().default?
                addressesData.unshift(childSnapshot.val())
                :
                addressesData.push(childSnapshot.val())
            })
            setAddresses(addressesData)
        }
        Snapshot()
    }, [addressSnapshot])

    const handleEdit =(e,key)=>{
        e.preventDefault()
        navigate('editaddress/'+key)
    }
    const handleRemove=(e,key)=>{
        e.preventDefault()
        writeUserData('users/'+currentUser.uid+'/addresses/'+key,{})
        setAddresses(pre=>{
            return pre.filter(address=>address.key!==key)
        })
    }
    
    const AddressTitle = (
        <>
            <div className={classes.routes}>
                <NavLink to='/account/home'>Account </NavLink>/<NavLink style={{fontWeight:700}} to='/account/addresses'> Addresses</NavLink>
            </div>
            <div className={classes.title}>
                <h1>Addresses</h1>
                <NavLink className={classes.addressAdd} to='/account/addresses/newaddress'>+ Add new address!</NavLink>
            </div>
        </>
    )

    if (isLoading) {
        return(
        <div className={classes.addressList}> 
            {AddressTitle}
            <strong>Loading...</strong>
        </div>
        )
    }

    return(
        <div className={classes.addressList}> 
            {AddressTitle}
            {addresses.length === 0? (<div className={classes.card} >Save an address and watch it magically show up at checkout!</div>)
            :
            (addresses.map((address=>(
                <AddressBox key={address.key} {...{address,handleEdit,handleRemove}}/>
            ))))
            }
        </div>
    )
}
export default AddressList