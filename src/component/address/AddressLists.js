import { useEffect, useState } from "react"
import { NavLink, useNavigate} from "react-router-dom"
import { useUserAuth } from "../../context/UserAuthContext"
import { useUserData } from "../../context/UserDataContext"
import classes from './AddressLists.module.css'
import { getDatabase,ref ,onValue, query, orderByChild} from "firebase/database";

const AddressList = ()=>{
    const { writeUserData } = useUserData()
    const { currentUser }  = useUserAuth()
    const [addresses,setAddresses]= useState([])
    const [reload,setReload] = useState(false)
    const navigate = useNavigate()
    const db = getDatabase()

    useEffect(()=>{
        const preferrAddress = []
        const addressesData =[]
        let isCancel = false
        const readAddressData = ()=>{
            const topUserPostsRef = query(ref(db, 'users/'+currentUser.uid+'/addresses'), orderByChild('createTime'))
             onValue(topUserPostsRef, (snapshot) => {
                snapshot.forEach((childSnapshot)=> {
                    if(!isCancel){
                        if(childSnapshot.val().default){
                            preferrAddress.push(childSnapshot.val())
                        }else{
                            addressesData.unshift(childSnapshot.val())
                        }
                    }
                  })
                  const Alladdress =  preferrAddress.concat(addressesData)
                  setAddresses(Alladdress)
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
                <NavLink to='/account/home'>Account </NavLink>/<NavLink style={{fontWeight:700}} to='/account/addresses'> Addresses</NavLink>
            </div>
            <div className={classes.title}>
                <h1>Addresses</h1>
                <NavLink className={classes.addressAdd} to='/account/addresses/newaddress'>+ Add new address!</NavLink>
            </div>
            {addresses.length === 0? (<div className={classes.card} >Save an address and watch it magically show up at checkout!</div>)
            :
            (addresses.map((address=>(
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
            ))))
            }
                    
               
        </div>
    )
}
export default AddressList