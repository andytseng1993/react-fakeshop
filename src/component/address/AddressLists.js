import { useEffect, useState } from "react"
import { NavLink, useNavigate} from "react-router-dom"
import { useUserAuth } from "../../context/UserAuthContext"
import { useUserData } from "../../context/UserDataContext"
import classes from './AddressLists.module.css'
import { ref , query, orderByChild} from "firebase/database";
import AddressBox from "./AddressBox"
import { useDatabaseSnapshot } from "@react-query-firebase/database";
import { database } from "../../firebase"

const AddressList = ()=>{
    const { writeUserData } = useUserData()
    const { currentUser }  = useUserAuth()
    const [addresses,setAddresses]= useState([])
    const navigate = useNavigate()
    const topAddressesRef = query(ref(database, 'users/'+currentUser.uid+'/addresses'), orderByChild('createTime'))
    const {data:addressSnapshot,isLoading} = useDatabaseSnapshot(["addresses"], topAddressesRef);

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