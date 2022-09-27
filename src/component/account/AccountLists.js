import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './AccountLists.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronRight, faHouseChimney,faUser,faHeart} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import { useUserAuth } from '../../context/UserAuthContext';
import { useUserData } from '../../context/UserDataContext';
import { getDatabase, onValue, orderByChild, query, ref } from 'firebase/database';

const AccountLists=()=>{
    const { readUserData } = useUserData()
    const {currentUser}=useUserAuth()
    const [address,setAddress]=useState({})
    const favoriteList = useSelector((state)=>state.favorites)
    const allProducts = useSelector((state)=>state.allProducts.products)
    const [favoriteData,setFavoriteData] = useState([])
    const db = getDatabase()
    useEffect(()=>{
        function filterItems(arr1, arr2) {
            const data= arr1.filter((el) => arr2.includes(el.id));
            if(data.length>3){ 
                return setFavoriteData(data.slice(0,3))
             }
            setFavoriteData(data);
        }
        const readAddressData = ()=>{
            const preferrAddress = []
            const addressesData =[]
            const topUserPostsRef = query(ref(db, 'users/'+currentUser.uid+'/addresses'), orderByChild('createTime'))
             onValue(topUserPostsRef, (snapshot) => {
                snapshot.forEach((childSnapshot)=> {
                    if(!isCancel){
                        if(childSnapshot.val().default){
                            return preferrAddress.push(childSnapshot.val())
                        }else{
                            addressesData.unshift(childSnapshot.val())
                        }
                    }
                  })
                  const Alladdress =  preferrAddress.concat(addressesData)
                  setAddress(Alladdress[0])
            })
        }
        let isCancel = false
        filterItems(allProducts, favoriteList)
        readAddressData()
        return ()=>{
            isCancel = true 
        }
    },[allProducts,favoriteList])

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
                {address.street?
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

                {favoriteData.map((favorite)=>(
                    <Link to={`/product/${favorite.id}`} key={favorite.id} className={classes.favoritesCard}>
                        <div className={classes.image}>
                            <img src={favorite.image} alt={favorite.title}></img>
                        </div>
                        <div className={classes.cartInfo}>
                            <div className={classes.title}>{favorite.title}</div>
                            <div className={classes.category}>
                                {favorite.category}
                                <div className={classes.price}>${favorite.price}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    )
}

export default AccountLists