import { NavLink, useNavigate} from "react-router-dom"
import { useUserAuth } from "../../context/UserAuthContext"
import { useUserData } from "../../context/UserDataContext"
import classes from './AddressLists.module.css'
import AddressBox from "./AddressBox"
import { useAddressData, useAddressQuery } from "../../useFn/UseAddress"



const AddressList = ()=>{
    const { writeUserData } = useUserData()
    const { currentUser }  = useUserAuth()
    const navigate = useNavigate()

    const {isLoading,refetch} = useAddressQuery()
    const {data:addresses} = useAddressData()
    
    const handleEdit =(e,key)=>{
        e.preventDefault()
        navigate('editaddress/'+key)
    }
    const handleRemove=(e,key)=>{
        e.preventDefault()
        writeUserData('users/'+currentUser.uid+'/addresses/'+key,{})
        refetch()
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