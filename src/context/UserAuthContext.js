import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile,
    updatePassword
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
    function updateNewPassword(newPassword){
        return updatePassword(auth.currentUser, newPassword)
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
        updateNewPassword
    }
    return (
    <UserAuthContext.Provider value={value}>
        {children}    
    </UserAuthContext.Provider>)
}

export const useUserAuth =()=>{
    return useContext(UserAuthContext)
}