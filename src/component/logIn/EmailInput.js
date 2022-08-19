import classes from './EmailInput.module.css'

const EmailInput= ({email,handleChange})=>{
    const handleEmailInputChange =(event)=>{
        handleChange(event.target.value)
    }
    return(
        <div className={classes.emailArea}>
            <div className={classes.email}>Email</div>
            <input type='email' required value={email} onChange={handleEmailInputChange} placeholder='Email Adress'></input>
        </div>
    )
}
export default EmailInput