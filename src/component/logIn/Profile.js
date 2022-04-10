import classes from './Profile.module.css'

const Profile=()=>{
    return (
        <section className={classes.profile}>
            <div className={classes.profileArea}> Profile
                <form>
                    <label>Name : </label>
                    <input></input>
                    <label>E-mail Address : </label>
                    <input></input>
                    <button>Update Profile</button>
                </form>
                <div>Joined</div>
            </div>
            <div className={classes.passwordArea}> Password
                <form>
                    <label>New Password : </label>
                    <input></input>
                    <label>Confirm Password : </label>
                    <input></input>
                    <button>Update Password</button>
                </form>
            </div>
        </section>
    )
}
export default Profile