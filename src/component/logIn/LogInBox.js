import classes from './LogInBox.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { setLogInBox, setRegisterBox } from '../../redux/actions';

const LogInBox=({children})=>{
    const dispatch = useDispatch()
    const closeHandler = () => {
        dispatch(setLogInBox(false))
        dispatch(setRegisterBox(false))
        unlockScroll()
    }
    const unlockScroll = () => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = ''
    }
    return (
        <section className={classes.login}>
            <div className={classes.content}>
                <div className={classes.closeBtn} onClick={closeHandler}><FontAwesomeIcon icon={faXmark} /></div>
                {children}
            </div>
        </section>
    )
}
export default LogInBox