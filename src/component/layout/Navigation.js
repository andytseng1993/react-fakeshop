import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink,useNavigate } from "react-router-dom"
import { useUserAuth } from "../../context/UserAuthContext"
import { deleteToBag, setLogInBox, setUserName } from "../../redux/actions"
import classes from './Navigation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import { getDownloadURL, getStorage, ref } from "firebase/storage"
import { useUserData } from "../../context/UserDataContext"
import { AnimatePresence, motion } from "framer-motion"

function Navigation(props) {
    const openLogIn = useSelector((state) => state.openLogInbox.logIn)
    const userName = useSelector((state)=> state.setUserName) 
    const cartLists = useSelector((state)=> state.setCartList)
    const addToBag = useSelector((state)=> state.addToBag)
    const cartCount = cartLists.reduce((pre,cur)=> pre+cur.count,0)
    const { logout,currentUser } = useUserAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { readUserData} = useUserData()
    const [profilePic,setProfilePic] = useState('')
    const upLoadNewImage =  useSelector(state => state.upLoadImage)
    const [behaviorZone,setBehaviorZone] = useState(false)
    const [behaviorProduct,setBehaviorProduct] =useState([])

    useEffect(()=>{
        if(addToBag.length === 0) return
        setBehaviorZone(true)
        const product = cartLists.filter((product)=>product.productId===addToBag[0])
        setBehaviorProduct(product[0])
        const timer =setTimeout(()=>{
            setBehaviorZone(false)
            dispatch(deleteToBag())
        },5000)
        return ()=>{
            clearTimeout(timer)
        }
    },[addToBag,dispatch])

    useEffect(() => {
        let isCancel = false
        if(!currentUser) return
        const readProfilePictureData = async()=>{
            await readUserData('users/'+currentUser.uid+'/profileImage/')
            .then(res=>{
                if(!isCancel && res.val()){
                    res.forEach(element => {
                        const storage = getStorage();
                        const pathReference = ref(storage, '/users/'+currentUser.uid+'/images/'+element.key+'.'+element.val());
                        getDownloadURL(pathReference).then((url)=>{
                            setProfilePic(url);
                        })
                    });
                }else{
                    setProfilePic(process.env.PUBLIC_URL+'/images/blank-profile-picture.png')
                }
            })  
        }
        readProfilePictureData()
        return () => {
            isCancel = true 
        }
    }, [currentUser,upLoadNewImage,readUserData])

    useEffect(()=>{
        currentUser?.displayName? 
            dispatch(setUserName(currentUser.displayName.trim()))
            :
            dispatch(setUserName(''))
    },[currentUser?.displayName,dispatch])
    
    const lockScroll = useCallback(
        () => {
            const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarCompensation}px`;
        }, [])
    const openLogInHandler = () => {
        dispatch(setLogInBox(!openLogIn))
        lockScroll()
    }
    const logOutHandler = async () => {
        try {
            await logout()
            .then(()=>{
                dispatch(setUserName(''))
                navigate('/')
            })
        } catch (error) {
            console.log(error);
        }
    }
    const scrollToHome = ()=>{
        window.scrollTo({ 
        top: 0,
        behavior: 'smooth'
      })
    }
    const viewBag= ()=>{
        navigate('/cart')
        setBehaviorZone(false)
        dispatch(deleteToBag())
    }

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <NavLink to='/' onClick={()=> scrollToHome()}>
                    <img src={process.env.PUBLIC_URL+'/logo192.png'} alt={'FakeStore'}></img>
                    FakeStore
                </NavLink>
            </div>
            <nav style={{display:'flex', alignItems:'center'}}>
                <NavLink to='/' onClick={()=> scrollToHome()} >
                    Home
                </NavLink>
                <NavLink to='/' onClick={()=> setTimeout(()=>{props.scroll()},750) }>
                    Product
                </NavLink>
                
                {userName?
                    <div className={classes.user}>
                        <img className={classes.userPicture} src={profilePic} alt={''}></img>
                        {`${userName}`}
                        <div className={classes.userBox}>
                            <NavLink to='account/home' className={classes.signout}>
                                Account
                            </NavLink>
                            <NavLink to='account/favorites' className={classes.signout}>
                                Favorites    
                            </NavLink>    
                            <div className={classes.signout} onClick={logOutHandler}>
                                Log Out
                            </div>
                        </div>
                    </div>
                    :
                    <button className={classes.signIn} onClick={openLogInHandler}>
                        Log In
                    </button>
                }
                <div className={classes.behavioZone}>
                    <NavLink to='cart' className={classes.cart}>
                        <FontAwesomeIcon icon={faCartShopping} style={cartCount>0? {color: 'black'} : {color: '#ccc' }} />
                        {
                            cartCount>0?
                                <div className={classes.cartCount}>{cartCount}</div>
                                :
                                null
                        }
                    </NavLink>
                    <AnimatePresence>
                        {behaviorZone?
                            (<motion.div className={classes.behaviorCart} initial={{ opacity: 0, scale: 0.3 }}
                                animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5}}
                                transition={{ duration: 0.3}}
                            >  
                                <div className={classes.added}><FontAwesomeIcon icon={faCircleCheck} className={classes.circleCheck}/>add to Cart</div>
                                <div className={classes.behaviorContent}>
                                    <img className={classes.behaviorImage}  src={behaviorProduct.image} alt={'product'} ></img>
                                    <div className={classes.behaviorTitle}>{behaviorProduct.title}</div>
                                </div>
                                <div className={classes.behaviorqty}>
                                    <div className={classes.qty}> <strong> QTY:</strong> {behaviorProduct.count}</div>
                                    <strong>$ {(behaviorProduct.count * behaviorProduct.price).toFixed(2)}</strong>
                                </div>
                                
                                <button className={classes.behaviorBag} onClick={viewBag}>View Cart ({cartCount})</button>
                            </motion.div>)
                            :null
                        }
                    </AnimatePresence>
                </div>
            </nav>
        </header>
    )
}

export default Navigation