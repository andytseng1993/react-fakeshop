import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './AccountLists.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronRight, faHouseChimney,faUser,faHeart} from "@fortawesome/free-solid-svg-icons";
import { useUserAuth } from '../../context/UserAuthContext';
import { useAddressData } from '../../useFn/UseAddress';
import { useFavoriteByTimeSelect } from '../../useFn/useFavoriteByTimeQuery';
import AccountFavorite from './AccountFavorite';

const AccountLists=()=>{
    const {currentUser}=useUserAuth()
    const [address,setAddress]=useState({})
    const [favoriteData,setFavoriteData] = useState([])
    const {data:addresses,isLoading:addressLoading} = useAddressData()
    const {data:favoriteArray,isLoading:favoriteArrayLoading} = useFavoriteByTimeSelect()

    useEffect(()=>{
        if(!addresses) return
        setAddress(()=>addresses[0])
    },[addresses])

    if(addressLoading||favoriteArrayLoading){
        return (
            <div className={classes.account}>
                <h1 style={{margin:40}}>Welcome to your Account</h1>
                <h2>Loading...</h2>
            </div>
        )
    }
    return(
        <div className={classes.account}>
            <h1 style={{margin:40}}>Welcome to your Account</h1>
            <div className={classes.accountInfo}>   
                <Link className={classes.accountInfoTitle} to='/account/profile'>
                    <FontAwesomeIcon style={{fontSize:28}} icon={faUser} />
                    Account Info
                    <FontAwesomeIcon icon={faChevronRight} />
                </Link>
                <div>Nickname:
                    <div className={classes.accountInfoContent}>{currentUser.displayName} </div>
                </div>
                <div>Email Address:
                    <div className={classes.accountInfoContent}>{currentUser.email} </div>
                </div>
            </div>
            <div className={classes.accountInfo}>
                <Link className={classes.accountInfoTitle} to='/account/addresses'>
                    <FontAwesomeIcon style={{fontSize:28}} icon={faHouseChimney} />
                    Shipping Address 
                    <FontAwesomeIcon icon={faChevronRight} />
                </Link>
                {address?.street?
                <div className={classes.card}>
                    <div className={classes.addressSummary}>
                        {address.default && <div className={classes.addressDefault}>&#9733; Default address</div>}
                        <div className={classes.addressName}>{address.firstName} {address.lastName}</div>
                        <div className={classes.addressStreet}>{address.street} {address.apt}, {address.city}, {address.state} {address.zipCode}</div>
                        <div className={classes.addressPhone}>Phone number: {address.phone}</div>
                    </div>
                </div>
                :<div> Adding an address allows for quicker checkout.</div>
                }
            </div>
            <div  className={classes.accountInfo}>
                <Link className={classes.accountInfoTitle} to='/account/favorites'>
                    <FontAwesomeIcon style={{fontSize:28}} icon={faHeart} />
                    Favorites
                    <div>
                        <span className={classes.viewAll} >View All</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </Link>
            {favoriteArray.length===0?
                <div>You can save items while you shop.</div>
            :
                (favoriteArray.map(productId=>
                    <AccountFavorite {...{productId}} key={productId} />
                ))
            }
            </div>
        </div>

    )
}

export default AccountLists