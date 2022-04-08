import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";


const UserAuthContext = createContext()

export const UserAuthContextProvider=({children})=>{
    const [currentUser,setCurrentUser] =useState('')
    const [User,setUser] =useState('')

    function signup (email,password){
        return createUserWithEmailAndPassword(auth,email,password)
    }
    function login (email,password){
        return signInWithEmailAndPassword(auth,email,password)
        .then(()=>{
            setUser(auth.currentUser.displayName)
          })
    }
    function logout (){
        return signOut(auth).then(()=>{
            setUser('')
          })
    }
    function updatfile(name){
        updateProfile(auth.currentUser, {
            displayName: name
          }).then(()=>{
            setUser(auth.currentUser.displayName)
          })
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
        User,
        currentUser,
        signup,
        login,
        logout,
        updatfile
    }
    return (
    <UserAuthContext.Provider value={value}>
        {children}    
    </UserAuthContext.Provider>)
}

export const useUserAuth =()=>{
    return useContext(UserAuthContext)
}