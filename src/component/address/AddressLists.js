import { useEffect, useState } from "react"
import { NavLink, useNavigate} from "react-router-dom"
import { useUserAuth } from "../../context/UserAuthContext"
import { useUserData } from "../../context/UserDataContext"
import classes from './AddressLists.module.css'

const AddressList = ()=>{
    const { writeUserData,readUserData } = useUserData()
    const { currentUser }  = useUserAuth()
    const [addresses,setAddresses]= useState([])
    const [reload,setReload] = useState(false)
    const navigate = useNavigate()
    
    useEffect(()=>{
        const addressesData =[]
        let isCancel = false
        const readAddressData = async()=>{
            await readUserData('users/'+currentUser.uid+'/addresses')
            .then(res=>{
                if(!isCancel){
                    for(let key in res.val()){
                        const review={...res.val()[key]}
                        if(res.val()[key].default){
                            addressesData.unshift(review)
                        }else{
                            addressesData.push(review)
                        }
                    }
                    setAddresses(addressesData);
                }
            })  
        }
        readAddressData()
        return ()=>{
            isCancel = true 
        }
        // eslint-disable-next-line
    },[reload])

    const handleEdit =(key)=>{
        navigate('editaddress/'+key)
    }
    const handleRemove=(key)=>{
        writeUserData('users/'+currentUser.uid+'/addresses/'+key,{})
        setReload(!reload)
    }

    return(
        <div className={classes.addressList}> 
            <div className={classes.routes}>
                <NavLink to='/account'>Account </NavLink>/<NavLink style={{fontWeight:700}} to='/account/addresses'> Addresses</NavLink>
            </div>
            <div className={classes.title}>
                <h1>Addresses</h1>
                <NavLink className={classes.addressAdd} to='/account/addresses/newaddress'>+ Add new address!</NavLink>
            </div>
            {addresses.map((address=>(
                <div className={classes.card} key={address.key}>
                    <div className={classes.addressSummary}>
                        {address.default && <div className={classes.addressDefault}>&#9733; Default address</div>}
                        <div className={classes.addressName}>{address.firstName} {address.lastName}</div>
                        <div className={classes.addressStreet}>{address.street} {address.apt}</div>
                        <div className={classes.addressCity}>{address.city}, {address.state} {address.zipCode}</div>
                        <div className={classes.addressPhone}>Phone number: {address.phone}</div>
                    </div>
                    <div className={classes.buttons}>
                       <button className={classes.addressEdit} onClick={()=>handleEdit(address.key)}>Edit</button>
                       <button className={classes.addressRemove} onClick={()=>handleRemove(address.key)}>Remove</button>
                    </div>
                </div>
            )))}
                    
               
        </div>
    )
}
export default AddressList