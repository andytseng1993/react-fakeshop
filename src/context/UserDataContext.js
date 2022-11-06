import { getDatabase,ref, set ,onValue} from "firebase/database";
import { createContext, useContext } from "react";

const UserDataContext = createContext()

export const UserDataContextProvider =({children})=>{
    const db = getDatabase()
   
    const writeUserData =(url,data)=>{
        return set(ref(db, url),data)
    }
    async function readUserData(url){
        return new Promise(resolve =>
            onValue(ref(db, url), (snapshot) => {
                resolve(snapshot)
            },
            {onlyOnce: true}
            ));
    }
    
    const value={
        writeUserData,
        readUserData
    }
    return(
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    )
}
export const useUserData = ()=>{
    return useContext(UserDataContext)
}