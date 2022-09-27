import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './AccountLists.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronRight, faHouseChimney,faUser,faHeart} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';

const initialAddress ={"apt": "Apt101",
"city": "Cypress",
"createTime": 1664256386706,
"default": false,
"firstName": "Yuyu",
"key": "0b6a1b68-56ef-4d4b-9a32-fa1824adcccf",
"lastName": "Tseng",
"phone": "+15624821121",
"state": "CA",
"street": "9091 Holder Street",
"zipCode": "90630"}

const AccountLists=()=>{
    const [address,setAddress]=useState(initialAddress)
    const favoriteList = useSelector((state)=>state.favorites)
    const allProducts = useSelector((state)=>state.allProducts.products)
    const [favoriteData,setFavoriteData] = useState([])
    useEffect(()=>{
        function filterItems(arr1, arr2) {
            const data= arr1.filter((el) => arr2.includes(el.id));
            setFavoriteData(data);
        }
        filterItems(allProducts, favoriteList)
    },[allProducts,favoriteList])
    console.log(favoriteData);
    return(
        <div className={classes.account}>
            <h1 >Welcome to your Account</h1>
            <div className={classes.accountInfo}>   
                <Link className={classes.accountInfoTitle} to='/account/profile'>
                    <FontAwesomeIcon style={{fontSize:28}} icon={faUser} />
                    Account Info
                    <FontAwesomeIcon icon={faChevronRight} />
                </Link>
                <div>Nickname:
                    <div className={classes.accountInfoContent}>yuyu </div>
                </div>
                <div>Email Address:
                    <div className={classes.accountInfoContent}>@gmail </div>
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
                    Favorites ({favoriteData.length})
                    <FontAwesomeIcon icon={faChevronRight} />
                </Link>
                <Link to={`/product/${favoriteData[0].id}`} className={classes.favoritesCard}>
                    <div className={classes.image}>
                        <img src={favoriteData[0].image} alt={favoriteData[0].title}></img>
                    </div>
                    <div className={classes.cartInfo}>
                        <div className={classes.title}>{favoriteData[0].title}</div>
                        <div className={classes.category}>
                            {favoriteData[0].category}
                            <div className={classes.price}>${favoriteData[0].price}</div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>

    )
}

export default AccountLists