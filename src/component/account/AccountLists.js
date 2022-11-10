import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './AccountLists.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronRight, faHouseChimney,faUser,faHeart} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { useUserAuth } from '../../context/UserAuthContext';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useUserData } from '../../context/UserDataContext';
import { setProducts,setFavoriteList } from "../../redux/actions";
import axios from 'axios';
import { fetchProductIdData } from '../shopPage/ProductDetail';
import { useAddressData } from '../../useFn/UseAddress';

const AccountLists=()=>{
    const dispatch = useDispatch()
    const {currentUser}=useUserAuth()
    const [address,setAddress]=useState({})
    const favoriteList = useSelector((state)=>state.favorites)
    const allProducts = useSelector((state)=>state.allProducts.products)
    const [favoriteData,setFavoriteData] = useState([])

    const {data:addresses,isLoading} = useAddressData()
    const {readUserData} = useUserData()
    
    const {data} = useQuery({ queryKey: ['favorites'], queryFn: async ()=>{
        const response = await readUserData('users/'+currentUser.uid+'/favorites')
        const favorites =[]
        response.forEach(element => {
            favorites.push(parseInt(element.key))
        })
        favorites.length ===0?dispatch(setFavoriteList([])):dispatch(setFavoriteList(favorites))
        return response
    },refetchOnWindowFocus:false,enabled:favoriteList.length===0?true:false })

    // const results = useQueries({
    //     queries: 
    //     favoriteList.map((itemId)=>{
    //         return{
    //             queryKey:['products',itemId],
    //             queryFn:()=>fetchProductIdData(itemId),
    //             refetchOnWindowFocus:false,
    //         }
    //     })
    // })

    useEffect(()=>{
        if(!addresses) return
        setAddress(()=>addresses[0])
    },[addresses])

    if(isLoading){
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
                {favoriteData.length===0?
                    <div>You can save items while you shop.</div>
                :
                    (favoriteData.map((favorite)=>(
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
                    )))
                }
            </div>
        </div>

    )
}

export default AccountLists