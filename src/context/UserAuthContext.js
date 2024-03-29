import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
    sendEmailVerification,
    sendPasswordResetEmail
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";


const UserAuthContext = createContext()

export const UserAuthContextProvider=({children})=>{
    const [currentUser,setCurrentUser] =useState('')
    

    function signup (email,password){
        return createUserWithEmailAndPassword(auth,email,password)
    }
    function login (email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }
    function logout (){
        return signOut(auth)
    }
    function updatfile(objectProfle){
        return updateProfile(auth.currentUser, objectProfle)
    }
    function updateNewPassword(email,oldPassword,newPassword){
        const credential = EmailAuthProvider.credential (email,oldPassword)
        return reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            return updatePassword(auth.currentUser, newPassword)
          })
    }
    function sendVerificationEmail(){
        return sendEmailVerification(currentUser)
    }
    function sendResetEmail(email){
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(()=>{
        const unsubscirbe = onAuthStateChanged(auth,(currentUser)=>{
            setCurrentUser(currentUser)
        })
        return ()=>{
            unsubscirbe()
        }
    },[])
    const value={
        currentUser,
        signup,
        login,
        logout,
        updatfile,
        updateNewPassword,
        sendVerificationEmail,
        sendResetEmail
    }
    return (
    <UserAuthContext.Provider value={value}>
        {children}    
    </UserAuthContext.Provider>)
}

export const useUserAuth =()=>{
    return useContext(UserAuthContext)
}